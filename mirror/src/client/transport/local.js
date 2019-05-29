import * as ActionCreators from '../../core/action-creators';
import { InMemory } from '../../server/db/inmemory';
import { Master } from '../../master/master';

/**
 * Creates a local version of the master that the client can interact with.
 */
function LocalMaster(game) {
  const clientCallbacks = {};

  const send = ({ type, playerID, args }) => {
    const callback = clientCallbacks[playerID];
    if (callback !== undefined) {
      callback.apply(null, [type, ...args]);
    }
  };

  const sendAll = arg => {
    for (const playerID in clientCallbacks) {
      if ({}.hasOwnProperty.call(clientCallbacks, playerID)) {
        const { type, args } = arg(playerID);
        send({ type, playerID, args });
      }
    }
  };

  const master = new Master(game, new InMemory(), { send, sendAll }, false);
  master.executeSynchronously = true;
  master.connect = (gameId, playerID, callback) => {
    clientCallbacks[playerID] = callback;
  };

  return master;
}

/**
 * Local
 */
class Local {
  /**
   * Creates a new Multiplayer instance.*
   */
  constructor({ master, store, gameID, playerID, gameName, numPlayers }) {
    this.master = master;
    this.store = store;
    this.gameName = gameName || 'default';
    this.gameID = gameID || 'default';
    this.playerID = playerID || null;
    this.numPlayers = numPlayers || 2;
    this.gameID = this.gameName + ':' + this.gameID;
    this.isConnected = true;
  }

  /**
   * Called when another player makes a move and the master broadcasts the
   * update to other clients (including this one)
   */
  onUpdate(gameID, state, deltalog) {
    const currentState = this.stre.getState();

    if (gameID === this.gameID && state._stateID >= currentState._stateID) {
      const action = ActionCreators.update(state, deltalog);
      this.store.dispatch(action);
    }
  }

  /**
   * Called when the client first connects to the master and requests
   * the current game state.
   */
  onSync(gameID, state, log) {
    if (gameID === this.gameID) {
      const action = ActionCreators.sync(state, log);
      this.store.dispatch(action);
    }
  }

  /** @THINK: I think this is the case for optimistic update
   * Called when an action that has to be relayed to the game
   * master is made.
   */
  onAction(state, action) {
    this.master.onUpdate(action, state._stateID, this.gameID, this.playerID);
  }

  /**
   * Connect to the server
   */
  connect() {
    this.master.connect(
      this.gameID,
      this.playerID,
      (type, ...args) => {
        if (type === 'sync') {
          this.onSync.apply(this, args);
        }
        if (type === 'update') {
          this.onUpdate.apply(this, args);
        }
      }
    );

    this.master.onSync(this.gameID, this.playerID, this.numPlayers);
  }

  /**
   * Subscribe to connection state change.
   */
  subscribe() {}

  /**
   * Updates the game id.
   * @param {string} id - The new game id.
   */
  updateGameId(id) {
    this.gameID = this.gameName + ':' + id;
    const action = ActionCreators.reset(null);
    this.store.dispatch(action);
    this.master.onSync(this.gameID, this.playerID, this.numPlayers);
  }

  /**
   * Update the player associated with this client
   * @param {string} id - The player id.
   */
  updatePlayerID(id) {
    this.playerID = id;
    const action = ActionCreators.reset(null);
    this.store.dispatch(action);
    this.master.onSync(this.gameID, this.playerID, this.numPlayers);
  }
}

export { LocalMaster, Local };
