import React from 'react';
import PropTypes from 'prop-types';
import { Debug } from './debug/debug';
import { Client as RawClient } from './client';

/**
 * Client
 *
 * boardgame.io React client.
 *
 * Returns:
 *   A React component that wraps board and provides an API through props for it to
 *   interact with the framework and dispatch actions such as MAKE_MOVE, GAME_EVENT,
 *   RESET, UNDO and REDO
 */
function Client(opts) {
  let {
    game,
    numPlayers,
    loading,
    board,
    multiplayer,
    ai,
    debug,
    enhancer,
  } = opts;

  // Component that is displayed before the client has synced with the game master
  if (loading === undefined) {
    const Loading = () => <div className="bgio-loading">Connecting ...</div>;
    loading = Loading;
  }

  /**
   * WrappedBoard
   *
   * The main React component that wraps the passed in board component and
   * adds the API to its props.
   */
  return class WrappedBoard extends React.Component {
    static propTypes = {
      gameID: PropTypes.string,
      playerID: PropTypes.string,
      credentials: PropTypes.string,
      debug: PropTypes.any,
    };

    static defaultProps = {
      gameID: 'default',
      playerID: null,
      credentials: null,
      debug: true,
    };

    state = {
      gameStateOverride: null,
    };

    constructor(props) {
      super(props);

      this.client = RawClient({
        game,
        ai,
        numPlayers,
        multiplayer,
        gameID: props.gameID,
        playerID: props.playerID,
        credentials: props.credentials,
        enhancer,
      });

      this.gameID = props.gameID;
      this.playerID = props.playerID;
      this.credentials = props.credentials;

      this.client.subscribe(this.forceUpdate);
    }

    componentDidMount() {
      this.client.connect();
    }

    componentDidUpdate(prevProps) {
      if (this.props.gameID !== prevProps.gameID) {
        this.updateGameID(this.props.gameID);
      }

      if (this.props.playerID !== prevProps.playerID) {
        this.updatePlayerID(this.props.playerID);
      }

      if (this.props.credentials !== prevProps.credentials) {
        this.updateCredentials(this.props.credentials);
      }
    }

    updateGameID = gameID => {
      this.client.updateGameID(gameID);
      this.gameID = gameID;
      this.forceUpdate();
    };

    updatePlayerID = playerID => {
      this.client.updatePlayerID(playerID);
      this.playerID = playerID;
      this.forceUpdate();
    };

    updateCredentials = credentials => {
      this.client.updateCredentials(credentials);
      this.credentials = credentials;
      this.forceUpdate();
    };

    overrideGameState = state => {
      this.setState({ gameStateOverride: state });
    };

    render() {
      let _board = null;
      let _debug = null;

      let state = this.client.getState();
      const { debug: debugProp, ...rest } = this.props;

      if (this.state.gameStateOverride) {
        state = { ...state, ...this.state.gameStateOverride };
      }

      if (state === null) {
        return React.createElement(loading);
      }

      if (board) {
        _board = React.createElement(board, {
          ...state,
          ...rest,
          isMultiplayer: multiplayer !== undefined,
          moves: this.client.moves,
          events: this.client.events,
          gameID: this.gameID,
          playerID: this.playerID,
          step: this.client.step,
          reset: this.client.reset,
          undo: this.client.undo,
          redo: this.client.redo,
        });
      }

      if (debug !== false && debugProp) {
        const showGameInfo = typeof debug === 'object' && debug.showGameInfo;
        const dockControls = typeof debug === 'object' && debug.dockControls;
        _debug = React.createElement(Debug, {
          gamestate: state,
          reducer: this.client.reducer,
          store: this.client.store,
          isMultiplayer: multiplayer !== undefined,
          moves: this.client.moves,
          events: this.client.events,
          gameID: this.gameID,
          playerID: this.playerID,
          credentials: this.credentials,
          step: this.client.step,
          reset: this.client.reset,
          undo: this.client.undo,
          redo: this.client.redo,
          visualizeAI: ai && ai.visualize,
          overrideGameState: this.overrideGameState,
          updateGameID: this.updateGameID,
          updatePlayerID: this.updatePlayerID,
          updateCredentials: this.updateCredentials,
          showGameInfo,
          dockControls,
        });
      }

      return (
        <div className="bgio-client">
          {_debug}
          {_board}
        </div>
      );
    }
  };
}

export { Client as default };
