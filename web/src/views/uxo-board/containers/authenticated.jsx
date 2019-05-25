// @flow
import React from 'react';
import {Client} from 'boardgame.io/react';
import UxoGame from '../../../../shared/games/ultimate-xo/index';
import UxoPage from '../components/board/Board';
import axios from 'axios';

const UxoBoardgameioClient = Client({
  game: UxoGame,
  board: UxoPage,
  debug: false,
  multiplayer: true,
});

type Props = {};
type State = {
  gameID: string,
  players: Object,
};
class AuthenticatedClient extends React.Component<Props, State> {
  state = {
    gameID: 'gameID',
    players: {
      '0': {
        credentials: 'credentials',
      },
      '1': {
        credentials: 'credentials',
      }
    }
  };

  componentDidMount() {
    const gameName = 'ultimate-xo';
    const PORT = 8000;
    let gameId = null;
    let playerCredentials = [];

    const newGame = axios.post(`http://localhost:${PORT}/games/${gameName}/create`, {numPlayers: 2})
      .then(response => {
        gameId = response.data.body.gameID;
      })
      .then(() => {

      })
  }
}
