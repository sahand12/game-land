import express from 'express';
import http from 'http';
import configureMongo from './configureMongo';
import initRouter from './routes';
import initModels from './models';
import addMiddlewares from './middlewares';

const PORT = process.env.NODE_PORT || 9000;
const DB_NAME = 'game-land-test';

async function run() {
  const app = express();
  console.log('1. Created express app');

  // Add middlewares to the app
  addMiddlewares(app);
  console.log('2. Added middlewares');

  // Add routes
  initRouter(app);
  console.log('3. Added routes');

  // Configure and connect the database
  const [client, db] = await configureMongo(DB_NAME);
  console.log('4. Connected to the database');

  // Add database connection and client as a global to the app, so they
  // can be accessible through the request/response lifecycle
  setGlobals(app, { dbClient: client, db });
  console.log('5. Added globals to the app');

  // Add models as globals to the app, so they can be accessible by controllers
  await initModels(app);
  console.log('6. Initiated models');

  // Start the server
  const server = http.createServer(app);
  console.log('7. Created http Server');

  // Fired once the server is ready
  server.on('listening', () => {
    console.log('server started listening');
  });

  // listen for requests
  server.listen(PORT, () => {
    console.log(`server is running on: localhost:${server.address().port}`);
  });
}

run()
  .then(afterServerStart)
  .catch(onServerError);

function setGlobals(app, { dbClient, db }) {
  app.set('dbClient', dbClient);
  app.set('db', db);
}
function afterServerStart() {}
function onServerError(err) {
  console.error(err.message, err.stack);
  process.exit(1);
}
