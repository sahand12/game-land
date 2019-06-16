import { createStore, compose, applyMiddleware } from 'redux';
import * as Actions from '../core/action-types';
import * as ActionCreators from '../core/action-creators';
import { error } from '../core/logger';
import { SocketIO } from './transport/socketio';
import { Local, LocalMaster } from './transport/local';
import { InitializeGame, CreateGameReducer } from '../core/reducer';

// The Game master object (if using a local one).
let localMaster_ = null;

/**
 * Implementation of Client
 */
class _ClientImpl {
  constructor() {}

  subscribe(fn) {
    const callback = () => fn(this.getState());
    this.transport.subscribe(callback);
    this.subscribeCallback = callback;
  }

  getState() {
    const state = this.store.getState();

    // This is the state before a sync with the game master
    if (state === null) {
      return state;
    }

    // isActive prop
    let isActive = true;

    const canPlayerMakeMove = this.game.flow.canPlayerMakeMove(
      state.G,
      state.ctx,
      this.playerID
    );

    if (this.multiplayer && !canPlayerMakeMove) {
      isActive = false;
    }

    if (
      !this.multiplayer &&
      this.playerID !== null &&
      this.player !== undefined &&
      !canPlayerMakeMove
    ) {
      isActive = false;
    }

    if (state.ctx.gameover !== undefined) {
      isActive = false;
    }

    // Secrets are normally stripped on the server, but we also strip them here
    // so that game developers can see their effects while prototyping
    const G = this.game.playerView(state.G, state.ctx, this.playerID);

    return {
      ...state,
      isActive,
      G,
      log: this.log,
      isConnected: this.transport.isConnected,
    };
  }

  connect() {}

  _createDispatchers() {}

  updatePlayerID(playerID) {}

  updateGameID(gameID) {}

  updateCredentials(credentials) {}
}

function client(opts) {
  return new _ClientImpl(opts);
}

export default Client;
