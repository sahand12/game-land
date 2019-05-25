// @flow
import React from 'react';
import { Client } from 'boardgame.io/react';

import UxoGame from '../../../shared/games/ultimate-xo/index';
import UxoPage from './components/board/Board';

const UxoBoardgameioClient = Client({
  game: UxoGame,
  board: UxoPage,
  multiplayer: { local: true },
  debug: false,
});

const UxoGameExample = () => (
  <div className="tw-flex tw-flex-wrap">
    <UxoBoardgameioClient playerID="0" />
    <UxoBoardgameioClient playerID="1" />
  </div>
);

export default UxoGameExample;
