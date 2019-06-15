import {createStore, compose, applyMiddleware} from "redux";
import * as Actions from '../core/action-types';
import * as ActionCreators from '../core/action-creators';
import {error} from '../core/logger';
import {SocketIO} from "./transport/socketio";
import {Local, LocalMaster} from "./transport/local";
import {InitializeGame, CreateGameReducer} from "../core/reducer";


// The Game master object (if using a local one).
let localMaster_ = null;

class _ClientImpl {
  constructor() {}

  subscribe(fn) {}

  getState() {}

  connect() {}

  _createDispatchers() {}

  updatePlayerID(playerID) {}

  updateGameID(gameID){}

  updateCredentials(credentials) {}
}

function client(opts) {
  return new _ClientImpl(opts);
}

export default Client;
