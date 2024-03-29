import {createStore} from 'redux';
import {InitialzeGame, CreateGameReducer} from '../core/reducer';
import {MAKE_MOVE, GAME_EVENT} from '../core/action-types';
import * as logging from '../core/logger';

const GameMetadataKey = gameID => `${gameID}:metadata`;

/**
 * Redact the log.
 *
 * @param {Array} redactedMoves - List of moves to redact.
 * @param {Array} log - The game log (or deltalog).
 * @param {String} playerID - The playerID that this log is to be sent to.
 */
function redactLog(redactedMoves, log, playerID) {
  if (redactedMoves === undefined || log === undefined) {
    return log;
  }

  return log.map(logEvent => {
    // Filter for all other players and a spectator
    if (playerID !== null && +playerID === +logEvent.action.payload.playerID) {
      return logEvent;
    }

    // only filter moves
    if (logEvent.action.type !== MAKE_MOVE) {
      return logEvent;
    }

    const moveName = logEvent.action.payload.type;
    let filteredLogEvent = logEvent;
    if (redactedMoves.includes(moveName)) {
      const newPayload = {
        ...filteredLogEvent.action.payload,
        args: undefined,
        argsRedacted: true,
      };
      filteredLogEvent = {
        ...filteredLogEvent,
        action: {...filteredLogEvent.action, payload: newPayload},
      };
    }

    return filteredLogEvent;
  });
}

/**
 * Verifies that the move came from a player with the appropriate credentials.
 *
 * @returns {boolean}
 */
function isActionFromAuthenticPlayer({action, gameMetadata, playerID}) {
  if (!gameMetadata) {
    return true;
  }

  if (!action.payload) {
    return true;
  }

  const hasCredentials = Object.keys(gameMetadata.players).some(key => {
    return !!(gameMetadata.players[key] && gameMetadata.players[key].credentials);
  });

  if (!hasCredentials) {
    return true;
  }

  // players have credentials in the gameMetadata from now on

  if (!action.payload.credentials) {
    return false;
  }

  if (action.payload.credentials !== gameMetadata.players[playerID].credentials) {
    return false;
  }

  return true;
}

/**
 * Master
 *
 * Class that runs the game and maintains the authoritative state.
 * It uses the transportAPI to communicate with clients and the
 * storageAPI to communicate with the database
 */
class Master {
  constructor(game, storageAPI, transportAPI, auth) {
    this.game = game;
    this.storageAPI = storageAPI;
    this.transportAPI = transportAPI;
    this.auth = () => true;

    if (auth === true) {
      this.auth = isActionFromAuthenticPlayer;
    }
    else if (typeof auth === 'function') {
      this.auth = auth;
    }
  }

  /**
   * Called on each move / event made by the client.
   * Computes the new value of the game state and returns it
   * along with a deltalog
   */
  async onUpdate(action, stateID, gameID, playerID) {
    let isActionAuthentic;

    if (this.executeSynchronously) {
      const gameMetadata = this.storageAPI.get(GameMetadataKey(gameID));
      isActionAuthentic = this.auth({action, gameMetadata, gameID, playerID});
    }
    else {
      const gameMetadata = await this.storageAPI.get(GameMetadataKey(gameID));
      isActionAuthentic = this.auth({action, gameMetadata, gameID, playerID});
    }

    if (!isActionAuthentic) {
      return {error: 'unauthorized action'};
    }

    const key = gameID;

    let state;
    if (this.executeSynchronously) {
      state = this.storageAPI.get(key);
    }
    else {
      state = await this.storageAPI.get(key);
    }

    if (state === undefined) {
      logging.error(`game not found, gameID=[${key}]`);
      return {error: 'game not found'};
    }

    const reducer = CreateGameReducer({
      game: this.game,
      numPlayers: state.ctx.numPlayers,
    });
    const store = createStore(reducer, state);

    // Check whether the player is allowed to make the move
    if (action.type === MAKE_MOVE && !this.game.flow.canPlayerMakeMove(state.G, state.ctx, playerID)) {
      logging.error(`move not processed - canPlayerMakeMove=false, playerID=[${playerID}]`);
      return;
    }

    // Check whether the player is allowed to call the event
    if (action.type === GAME_EVENT && !this.game.flow.canPlayerCallEvent(state.G, state.ctx, playerID)) {
      logging.error(`event not processed - invalid playerID=[${playerID}]`);
      return;
    }

    if (state._stateID !== stateID) {
      logging.error(`invalid stateID, was=[${stateID}], expected=[${state._stateID}`);
      return;
    }

    let log = store.getState().log || [];

    // Update server's version of the store.
    store.dispatch(action);
    state = store.getState();

    this.transportAPI.sendAll(playerId => {
      const filteredState = {
        ...state,
        G: this.game.playerView(state.G, state.ctx, playerID),
        ctx: {...state.ctx, _random: undefined},
        log: undefined,
        deltalog: undefined,
        _undo: [],
        _redo: [],
        _initial: {
          ...state._initial,
          _undo: [],
          _redo: [],
        },
      };

      const redactedLog = redactLog(this.game.flow.redactedMoves, state.deltalog, playerId);

      return {
        type: 'update',
        args: [gameID, filteredState, redactedLog]
      }
    });

    // TODO: We currently attach the log back into the state
    // object before storing it, but this should probably
    // sit in a different part of the database eventually.
    log = [...log, ...state.deltalog];
    const stateWithLog = {...state, log};

    if (this.executeSynchronously) {
      this.storageAPI.set(key, stateWithLog);
    }
    else {
      await this.storageAPI.set(key, stateWithLog);
    }
  }

  /**
   * Called when the client connects / reconnects.
   * Returns the latest game state and the entire log.
   */
  async onSync(gameID, playerID, numPlayers) {
    const key = gameID;

    let state;

    if (this.executeSynchronously) {
      state = this.storageAPI.get(key);
    }
    else {
      state = await this.storageAPI.get(key);
    }

    // If the game does not exist, then create one on demand.
    // TODO: Move this out of the sync call
    if (state === undefined) {
      state = InitialzeGame({game: this.game, numPlayers});

      if (this.executeSynchronously) {
        this.storageAPI.set(key, state);
        state = this.storageAPI.get(key);
      }
      else {
        await this.storageAPI.set(key, state);
        state = await this.storageAPI.get(key);
      }
    }

    const filteredState = {
      ...state,
      G: this.game.playerView(state.G, state.ctx, playerID),
      ctx: {...state.ctx, _random: undefined},
      log: undefined,
      deltalog: undefined,
      _undo: [],
      _redo: [],
      _initial: {
        ...state._initial,
        _undo: undefined,
        _redo: undefined,
      },
    };

    const log = redactLog(this.game.flow.redactedMoves, state.log, playerID);

    this.transportAPI.send({
      playerID,
      type: 'sync',
      args: [gameID, filteredState, log],
    });

    return;
  }
}

export {isActionFromAuthenticPlayer, Master, redactLog};
