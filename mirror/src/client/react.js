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
    static propTypes = {};
    static defaultProps = {};
    state = {};

    constructor(props) {}
    componentDidMount() {}
    componentDidUpdate(prevProps) {}
    updateGameID = gameID => {};
    updatePlayerID = playerID => {};
    updateCredentials = credentials => {};
    overrideGameState = state => {};

    render() {}
  };
}

export { Client as defualt };
