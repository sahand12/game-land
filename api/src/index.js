// @flow
import { Server as GameServer } from 'boardgame.io/server';
import UltimateXOGame from '../../web/shared/games/ultimate-xo/game';

const server = GameServer({ games: [UltimateXOGame] });

server
  .run(8000)
  .then(() => {
    console.dir(server.app.context);
  })
  .catch(err => console.error(err));
