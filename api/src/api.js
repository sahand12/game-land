import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import configureMongo from './configureMongo';
import routes from './routes';
import initModels from './models';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

(async () => {
  const [client, db] = await configureMongo('game-land-test');
  setGlobals({ dbClient: client, db });
  await initModels(app);
  startServer();
})();

function setGlobals({ dbClient, db }) {
  app.set('dbClient', dbClient);
  app.set('db', db);
}
function startServer() {
  const server = createServer(app);
  server.listen(9000, () => {
    console.log(`server is running on: localhost:${server.address().port}`);
  });
}
