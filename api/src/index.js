// @flow
import { Server as GameServer, Mongo } from 'boardgame.io/server';
import UltimateXOGame from '../../web/shared/games/ultimate-xo/game';

const server = GameServer({
  games: [UltimateXOGame],
  db: new Mongo({
    url: 'mongodb://localhost:27017',
    dbname: 'bgio',
  }),
});
const lobbyConfig = {
  apiPort: 9000,
  apiCallback: () => {},
};

server
  .run({ port: 8000, lobbyConfig })
  .then(() => {
    console.log(`api server and app server both are running smoothly`);
  })
  .catch(err => console.error(err));
