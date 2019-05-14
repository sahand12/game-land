// @flow
import React from 'react';
import { Client } from 'boardgame.io/react';

import UltimateXOGame from '../shared/games/ultimate-xo';
import UltimateXOPage from './views/UXOBoard';

const UltimateXOClient = Client({
  game: UltimateXOGame,
  board: UltimateXOPage,
  multiplayer: { local: true },
  debug: false,
});

const AppBoard = () => (
  <div className="tw-flex tw-flex-wrap">
    <UltimateXOClient playerID="0" />
    <UltimateXOClient playerID="1" />
  </div>
);

// {/*<UltimateXOClient playerID="1" />*/}
export default AppBoard;
