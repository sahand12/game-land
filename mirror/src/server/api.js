import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import { generate as uuid } from 'shortid';
import cors from '@koa/cors';

import { InitializeGame } from '../core/reducer';

const isGameMetadataKey = (key, gameName) =>
  key.match(`${gameName}:.*:metadata`);
const getNamespacedGameID = (gameID, gameName) => `${gameName}:${gameID}`;
const createGameMetadata = function createGameMetadata() {
  return {
    players: {},
  };
};
const GameMetadataKey = gameID => `${gameID}:metadata`;

/**
 * Creates a new game instance.
 *
 * @param db - The storage API.
 * @param game - The game config object.
 * @param numPlayers
 * @param setupData
 * @param lobbyConfig
 * @returns {Promise<void>}
 * @constructor
 */
async function CreateGame(db, game, numPlayers, setupData, lobbyConfig) {
  const gameMetadata = createGameMetadata();
  const state = InitializeGame({ game, numPlayers, setupData });

  for (let playerIndex = 0; playerIndex < numPlayers; playerIndex += 1) {
    const credentials = lobbyConfig.uuid();
    gameMetadata.players[playerIndex] = { id: playerIndex, credentials };
  }

  const gameID = lobbyConfig.uuid();
  const namespacedGameID = getNamespacedGameID(gameID, game.name); // 'ultimate-xo:ldja;jd'

  await db.set(GameMetadataKey(namespacedGameID), gameMetadata); // 'ultimate-xo:ldja;jd:metadata'
  await db.set(namespacedGameID, state);

  return gameID;
}

function createApiServer({ db, games, lobbyConfig }) {
  const app = new Koa();
  return addApiToServer({ app, db, games, lobbyConfig });
}

function addApiToServer({ app, db, games, lobbyConfig }) {
  if (!lobbyConfig) {
    lobbyConfig = {};
  }
  if (!lobbyConfig.uuid || typeof lobbyConfig.uuid !== 'function') {
    lobbyConfig = { ...lobbyConfig, uuid };
  }
  const router = new Router();

  /** **** Routes **** */

  // Get a list of available games
  router.get('/games', async ctx => {
    ctx.body = games.map(game => game.name);
  });

  // Get a list of game instances for a game name
  router.get('/games/:name', async ctx => {
    const gameName = ctx.params.name;
    const gameList = await db.list();
    const rooms = [];
    for (const key of [...gameList]) {
      if (isGameMetadataKey(key, gameName)) {
        const gameID = key.slice(
          gameName.length + 1,
          key.lastIndexOf(':metadata')
        );
        const metadata = await db.get(key);
        rooms.push({
          gameID,
          players: Object.values(metadata.players).map(player => {
            return { id: player.id, name: player.name };
          }),
        });
      }
    }

    ctx.body = { rooms };
  });

  // Get a specific game instance
  router.get('/games/:name/:id', async ctx => {
    const gameName = ctx.params.name;
    const gameID = ctx.params.id;
    const room = await db.get(`${gameName};${GameMetadataKey(gameID)}`);
    if (!room) {
      ctx.throw(404, `Room ${gameID} not found`);
    }
    const strippedRoom = {
      roomID: gameID,
      players: Object.values(room.players).map(player => {
        return { id: player.id, name: player.name };
      }),
    };

    ctx.body = strippedRoom;
  });

  router.post('/games/:name/create', koaBody(), async ctx => {
    // the name of the game (for example: tic-tac-toe).
    const gameName = ctx.params.name;

    // User-data to pass to the game setup function
    const { setupData } = ctx.request.body;

    // The number of players for this game instance
    let numPlayers = parseInt(ctx.request.body.numPlayers, 10);
    if (!numPlayers) {
      numPlayers = 2;
    }

    // @TODO: what happens here if the gameName is not found?
    const game = games.find(g => g.name === gameName);
    const gameID = await CreateGame(
      db,
      game,
      numPlayers,
      setupData,
      lobbyConfig
    );

    ctx.body = { gameID };
  });

  router.post('/games/:name/:id/join', koaBody(), async ctx => {
    const { playerID, playerName } = ctx.request.body;
    if (!playerID) {
      ctx.throw(403, 'playerID is required');
    }
    if (!playerName) {
      ctx.throw(403, 'playerName is required');
    }
    const { name: gameName, id: roomID } = ctx.params;
    const namespacedGameID = getNamespacedGameID(roomID, gameName);
    const gameMetadata = await db.get(GameMetadataKey(namespacedGameID));
    if (!gameMetadata) {
      ctx.throw(404, `Game ${roomID} not found`);
    }
    if (!gameMetadata.players[playerID]) {
      ctx.throw(404, `player ${playerID} not found`);
    }
    if (gameMetadata.players[playerID].name) {
      ctx.throw(409, `player ${playerID} not available`);
    }

    gameMetadata.players[playerID].name = playerName;
    const playerCredentials = gameMetadata.players[playerID].credentials;

    await db.set(GameMetadataKey(namespacedGameID), gameMetadata);

    ctx.body = {
      playerCredentials,
    };
  });
  router.post('/games/:name/:id/leave', async ctx => {});
  router.post('/games/:name/:id/rename', async ctx => {});
}

export { CreateGame, addApiToServer };
