import React from 'react';
import { Client } from 'boardgame.io/react';
import {
  UltimateTicTacToeBoard,
  UltimateTicTacToeGame
} from '../../shared/games/ultimate-xo';

const UltimateTicTacToeClient = Client({
  game: UltimateTicTacToeGame,
  board: UltimateTicTacToeBoard
});

const App = () => (
  <div>
    <UltimateTicTacToeClient playerID="0" />
  </div>
);

export default App;
