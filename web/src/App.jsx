import React from 'react';
import { Client } from 'boardgame.io/react';
import UltimateXOGame from '../shared/games/ultimate-xo';
import UltimateXOBoard from './views/UXOBoard';

const UltimateXOClient = Client({
  game: UltimateXOGame,
  board: UltimateXOBoard,
  multiplayer: { local: true },
  debug: false,
});

const App = () => (
  <div className="tw-flex tw-justify-around tw-py-4">
    <UltimateXOClient playerID="0" />
    <UltimateXOClient playerID="1" />
  </div>
);

export default App;
