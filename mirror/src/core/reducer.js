import { parse, stringify } from 'flatted';
import * as actions from './action-types';
import { Random } from './random';
import { Events } from './events';
import * as plugins from '../plugins/main';
import Game from './game';

/**
 * Moves can return this when they want to indicate that the combination
 * of arguments is illegal and the move ought to be discarded.
 */
const INVALID_MOVE = 'INVALID_MOVE';

/**
 * Context API to allow writing custom logs in games.
 */
class GameLoggerCtxAPI {
  constructor() {
    this._payload = undefined;
  }

  _api() {
    return {
      setPayload: payload => {
        this._payload = payload;
      },
    };
  }

  attach(ctx) {
    return { ...ctx, log: this._api() }; // log: {setPayload}
  }

  update(state) {
    if (this._payload === undefined) {
      return state;
    }

    // attach the payload to the last log event.
    const { deltalog } = state;
    deltalog[deltalog.length - 1] = {
      ...deltalog[deltalog.length - 1],
      payload: this._payload,
    };
    this._payload = undefined;

    return { ...state, deltalog };
  }

  static detach(ctx) {
    const { log, ...ctxWithoutLog } = ctx;
    return ctxWithoutLog;
  }
}

/**
 * This class is used to attach/detach various utility objects onto a ctx,
 * without having to manually attach/detach them all separately
 */
class ContextEnhancer {
  constructor(ctx, game, player) {
    this.random = new Random(ctx);
    this.events = new Events(game.flow, player);
    this.log = new GameLoggerCtxAPI();
  }

  attachToContext(ctx) {
    let ctxWithApi = this.random.attach(ctx);
    ctxWithApi = this.events.attach(ctxWithApi);
    ctxWithApi = this.log.attach(ctxWithApi);
    return ctxWithApi;
  }

  _update(state, updateEvents) {
    let newState = updateEvents ? this.events.update(state) : state;
    newState = this.random.update(newState);
    newState = this.log.update(newState);
    return newState;
  }

  updateAndDetach(state, updateEvents) {
    const newState = this._update(state, updateEvents);
    newState.ctx = ContextEnhancer.detachAllFromContext(newState.ctx);
    return newState;
  }

  static detachAllFromContext(ctx) {
    let ctxWithoutApi = Random.detach(ctx);
    ctxWithoutApi = Events.detach(ctxWithoutApi);
    ctxWithoutApi = GameLoggerCtxAPI.detach(ctxWithoutApi);
    return ctxWithoutApi;
  }
}

/**
 * Creates the initial game state
 *
 * @param {object} game - Return value of Game()
 * @param {number} numPlayers - The number of players
 * @param {object} setupData - The user provided setup data
 * @constructor
 */
function InitializeGame({ game, numPlayers, setupData }) {
  if (numPlayers === undefined) {
    numPlayers = 2;
  }

  // Initialize the ctx object
  let ctx = game.flow.ctx(numPlayers);

  // Initialize the seed for Random and add it ctx object
  let seed = game.seed;
  if (seed === undefined) {
    seed = Random.seed();
  }
  ctx._random = { seed };

  // Pass ctx through all the plugins that want to modify it.
  ctx = plugins.ctx.setup(ctx, game);

  // Augment ctx with the enhancers (TODO: move these into plugins)
  const apiCtx = new ContextEnhancer(ctx, game, ctx.currentPlayer);
  let ctxWithApi = apiCtx.attachToContext(ctx);

  let initialG = game.setup(ctxWithApi, setupData);

  // Pass G through all the plugins that want to modify it.
  initialG = plugins.G.setup(initialG, ctxWithApi, game);

  const initial = {
    G: initialG, // user managed state
    ctx: ctx, // Framework managed state
    _undo: [], // List of {G, ctx} pairs that can be undone.
    _redo: [], // List of {G, ctx} paris that can be redone.

    // A monotonically non-decreasing ID to ensure that state updates are
    // only allowed from clients that are at the same version that the server.
    _stateID: 0,

    // A snapshot of this object so that actions can be replayed over it ot
    // view old snapshots.
    // TODO: This will no longer be necessary once te log stops replaying
    // actions (but reads the actual game states instead).
    _initial: {},
  };

  let state = game.flow.init({ G: initial.G, ctx: ctxWithApi });

  initial.G = state.G;
  initial._undo = state._undo;
  state = apiCtx.updateAndDetach(state, true);
  initial.ctx = state.ctx;

  const deepCopy = obj => parse(stringify(obj));
  initial._initial = deepCopy(initial);

  return initial;
}

/**
 * Creates the main game state reducer.
 *
 * @param {object} game - The return value of Game().
 * @param {boolean} multiplayer - Set to true if we are in a multiplayer client.
 */
function CreateGameReducer({ game, multiplayer }) {
  /**
   * Redux reducer that maintains the overall game state.
   *
   * @param {object} state - The state before the action.
   * @param {object} action - A Redux action.
   */
  return function gameReducer(state = null, action) {
    switch (action.type) {
      case actions.GAME_EVENT: {
        state = { ...state, deltalog: [] };

        // Process game events only on the server. These events like `endTurn`
        // typically contain code that may rely on secret state and can not be
        // computed on the client.
        if (multiplayer) {
          return state;
        }

        // Ignore the event if the player isn't allowed to make it.
        if (
          action.payload.playerID !== null &&
          action.payload.playerID !== undefined &&
          !game.flow.canPlayerCallEvent(state.G, state.ctx, action.payload.playerID)
        ) {
          return state;
        }

        const apiCtx = new ContextEnhancer(state.ctx, game, action.payload.playerID);
        state.ctx = apiCtx.attachToContext(state.ctx);

        let newState = game.flow.processGameEvent(state, action);
        newState = apiCtx.updateAndDetach(newState, true);

        return { ...newState, _stateID: state._stateID + 1 };
      }

      case actions.MAKE_MOVE: {
        state = { ...state, deltalog: [] };

        // Check whether the game knows the move at all.
        if (!game.moveNames.includes(action.payload.type)) {
          return state;
        }

        // Ignore the move if it isn't allowed at this point
        if (!game.flow.canMakeMove(state.G, state.ctx, action.payload.type)) {
          return state;
        }

        // Ignore the move if the player isn't allowed to make it.
        if (
          action.payload.playerID !== null &&
          action.payload.playerID !== undefined &&
          !game.flow.canPlayerMakeMove(state.G, state.ctx, action.payload.playerID)
        ) {
          return state;
        }

        const apiCtx = new ContextEnhancer(state.ctx, game, action.payload.playerID);
        let ctxWithApi = apiCtx.attachToContext(state.ctx);

        // process the move
        let G = game.processMove(state.G, action.payload, ctxWithApi);
        if (G === INVALID_MOVE) {
          // The game declared the move as invalid
          return state;
        }

        // Create a log entry for this move.
        const logEntry = {
          action,
          _stateID: state._stateID,
          turn: state.ctx.turn,
          phase: state.ctx.phase,
        };

        // Don't call into events here
        const newState = apiCtx.updateAndDetach({ ...state, deltalog: [logEntry] }, false);
        let ctx = newState.ctx;

        // Undo changes to G if the move should not run on the client.
        if (multiplayer && !game.flow.optimisticUpdate(G, ctx, action.payload)) {
          G = state.G;
        }

        state = { ...newState, G, ctx, _stateID: state._stateID + 1 };

        // If we're on the client, just process the move and no triggers in
        // multiplayer mode.
        // These will be processed on the server, which will send back a
        // state update.
        if (multiplayer) {
          return state;
        }

        // Allow the flow reducer to process any triggers that happen
        // after moves.
        ctxWithApi = apiCtx.attachToContext(state.ctx);
        state = game.flow.processMove({ ...state, ctx: ctxWithApi }, action.payload);
        state = apiCtx.updateAndDetach(state, true);
        state._undo[state._undo.length - 1].ctx = state.ctx;

        return state;
      }

      case actions.RESET:
      case actions.UPDATE:
      case actions.SYNC: {
        return action.state;
      }

      case actions.UNDO: {
        const { _undo, _redo } = state;

        if (_undo.length < 2) {
          return state;
        }

        const last = _undo[_undo.length - 1];
        const restore = _undo[_undo.length - 2];

        // only allow undoable moves to be undone.
        if (!game.flow.canUndoMove(state.G, state.ctx, last.moveType)) {
          return state;
        }

        return {
          ...state,
          G: restore.G,
          ctx: restore.ctx,
          _undo: _undo.slice(0, _undo.length - 1),
          _redo: [last, ..._redo],
        };
      }

      case actions.REDO: {
        const { _undo, _redo } = state;

        if (_redo.length === 0) {
          return state;
        }

        const [first] = _redo;

        return {
          ...state,
          G: first.G,
          ctx: first.ctx,
          _undo: [..._undo, first],
          _redo: _redo.slice(1),
        };
      }

      default: {
        return state;
      }
    }
  };
}

export { INVALID_MOVE, GameLoggerCtxAPI, ContextEnhancer, InitializeGame, CreateGameReducer };
