import * as actions from './action-types';

/**
 * Generates a move to be dispatched to the game move reducer.
 *
 * @param {string} type - The move name defined by the user
 * @param {array} args - The additional args that the move defined by user accespts
 * @param {string} playerID - The id of the player who is making the move
 * @param {string} credentials - The credentials for the player making this move.
 */
const makeMove = function makeMove(type, args, playerID, credentials) {
  return {
    type: actions.MAKE_MOVE,
    payload: { type, args, playerID, credentials },
  };
};

/**
 * Generates a game event to be dispatched to the flow reducer.
 *
 * @param {string} type - The event type.
 * @param {array} args - The Additional arguments.
 * @param {string} playerID - The id of the player making this action.
 * @param {string} credentials - (optional) The credentials for the player making this action.
 * @returns {{payload: {args: *, credentials: *, type: *, playerID: *}, type: string}}
 */
const gameEvent = function gameEvent(type, args, playerID, credentials) {
  return {
    type: actions.GAME_EVENT,
    payload: { type, args, playerID, credentials },
  };
};

/**
 * Generates an automatic game event that is a side-effect of a move.
 *
 * @param {string} type - The event type.
 * @param {array} args - The Additional arguments.
 * @param {string} playerID - The id of the player making this action.
 * @param {string} credentials - (optional) The credentials for the player making this action.
 * @returns {{payload: {args: *, credentials: *, type: *, playerID: *}, type: string}}
 */
const automaticeGameEvent = function automaticGameEvent(
  type,
  args,
  playerID,
  credentials
) {
  return {
    type: actions.GAME_EVENT,
    automatic: true,
    payload: { type, args, playerID, credentials },
  };
};

/**
 * To reset the Redux store's state on a sync.
 *
 * @param {object} state - The state to restore
 * @param {array} log - The log to restore
 * @returns {{clientOnly: boolean, log: *, state: *, type: string}}
 */
const sync = function sync(state, log) {
  return {
    type: actions.SYNC,
    state,
    log,
    clientOnly: true,
  };
};

/**
 * Update the Redux store'state in response to an action coming from another player.
 *
 * @param {object} state - The state to restore.
 * @param {Array} deltalog - A log delta
 * @returns {{clientOnly: boolean, deltalog: *, state: *, type: string}}
 */
const update = function update(state, deltalog) {
  return {
    type: actions.UPDATE,
    state,
    deltalog,
    clientOnly: true,
  };
};

/**
 * Reset the game state in a client
 *
 * @param {object} state - The initial state
 * @returns {{clientOnly: boolean, state: *, type: string}}
 */
const reset = function reset(state) {
  return {
    type: actions.RESET,
    state,
    clientOnly: true,
  };
};

/**
 * Undo the last move
 */
const undo = function undo() {
  return {
    type: actions.UNDO,
  };
};

/**
 * Redo the last undone move.
 */
const redo = function redo() {
  return {
    type: actions.REDO,
  };
};

export {
  makeMove,
  gameEvent,
  automaticeGameEvent,
  sync,
  update,
  reset,
  redo,
  undo,
};
