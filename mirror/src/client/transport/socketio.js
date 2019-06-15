import io from 'socket.io-client';
import * as ActionCreators from '../../core/action-creators';

/**
 * Transport interface that interacts with the Master via socket.io.
 */
class SocketIO {
  /**
   * Creates a new Multiplayer instance.
   *
   * @param {object} socket - Override for unit tests.
   * @param {object} socketOpts - Options to pass to socket.io.
   * @param {object} store - The redux store
   * @param {string} gameID - The game ID to connect to.
   * @param {string} playerID - The player ID associated with this client.
   * @param {string} gameName - The game type (the `name` field in `Game`).
   * @param {number} numPlayers - the number of players
   * @param {string} server - The game server in the form of 'hostname:port'. Defaults to the server serving the client if not provided.
   */
  constructor({
    socket,
    socketOpts,
    store,
    gameID,
    playerID,
    gameName,
    numPlayers,
    server,
  } = {}) {
    this.server = server;
    this.socket = socket;
    this.store = store;
    this.socketOpts = socketOpts;
    this.gameName = gameName || 'default';
    this.gameID = gameID || 'default';
    this.playerID = playerID || null;
    this.numPlayers = numPlayers || 2;
    this.gameID = `${this.gameName}:${this.gameID}`; // `ultimate-xo:lkjdla893289`
    this.isConnected = false;
    this.callback = () => {};
  }

  /**
   * Called when an action that has to be relayed to the game master is made.
   */
  onAction(state, action) {
    this.socket.emit(
      'update',
      action,
      state._stateID,
      this.gameID,
      this.playerID
    );
  }

  /**
   * Connect to the server and
   * set up listeners for the messages coming from the master.
   */
  connect() {
    const that = this;
    if (!this.socket) {
      if (this.server) {
        let { server } = this;
        if (server.search(/^https?:\/\//) === -1) {
          server = `http://${this.server}`;
        }
        if (server.substr(-1) !== '/') {
          // Add trailing slash if not already present
          server = `${server}/`;
        }
        this.socket = io(server + this.gameName, this.socketOpts);
      } else {
        this.socket = io(`/${this.gameName}`, this.socketOpts);
      }
    }

    this.socket.on('update', onUpdate);
    this.socket.on('sync', onSync);

    // Initial sync to get game state.
    this.socket.emit('sync', this.gameID, this.playerID, this.numPlayers);

    this.socket.on('connect', onConnect);
    this.socket.on('disconnect', onDisconnect);

    // new state comes from the server and we need to match our own store to it
    function onUpdate(gameID, state, deltalog) {
      const currentState = that.store.getState();

      if (gameID === that.gameID && state._stateID >= currentState._stateID) {
        const action = ActionCreators.update(state, deltalog);
        this.store.dispatch(action);
      }
    }

    // Called when the client first connects to the master and requests the current
    // game state.
    function onSync(gameID, state, log) {
      if (gameID === that.gameID) {
        const action = ActionCreators.sync(state, log);
        that.store.dispatch(action);
      }
    }

    // Keep track of connection status.
    function onConnect() {
      that.isConnected = true;
      that.callback();
    }
    function onDisconnect() {
      that.isConnected = false;
      that.callback();
    }
  }

  /**
   * subscribe to connection state changes
   */
  subscribe(fn) {
    this.callback = fn;
  }

  /**
   * Updates the game id.
   * @param {string} id - The new game id.
   */
  updateGameID(id) {
    this.gameID = this.gameName + ':' + id;

    const action = ActionCreators.reset(null);
    this.store.dispatch(action);

    if (this.socket) {
      this.socket.emit('sync', this.gameID, this.playerID, this.numPlayers);
    }
  }

  /**
   * Updates the player associated with this client.
   * @param {string} id - The new player id.
   */
  updatePlayerID(id) {
    this.playerID = id;

    const action = ActionCreators.reset(null);
    this.store.dispatch(action);

    if (this.socket) {
      this.socket.emit('sync', this.gameID, this.playerID, this.numPlayers);
    }
  }
}

export { SocketIO as default };
