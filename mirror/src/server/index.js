import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import {generate as uuid} from 'shortid';
import cors from '@koa/cors';

import {InitializeGame} from '../core/reducer';

const isGameMetaDataKey = (key, gameName) => key.match(`${gameName}:.*:metadata`);
const getNamespacedGameID = (gameID, gameName) => `${gameName}:${gameID}`;
const createGameMetadata = () => ({players: {}});

const GameMetadataKey = gameID => `${gameID}:metadata`;

/**
 * Creates a new game.
 *
 * @param {object} db - The Storage API
 * @param {object} game - The game config object
 * @param {number} numPlayers - The number of Players
 * @param {object} setupData - User-defined object that's available during game setup.
 * @param {object} lobbyConfig - Configuration options for the lobby.
 *
 * @returns {Promise<void>}
 * @constructor
 */
async function CreateGame(db, game, numPlayers, setupData, lobbyConfig) {
  const gameMetadata = createGameMetadata();

  const state = InitializeGame({game, numPlayers, s})
}

export {CreateGame};
