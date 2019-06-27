import axios from 'axios';
import createError from 'http-errors';
import User from '../models/User';
import playerQueue from './playerQueue';

const QUEUE_TIMEOUT = 60 * 1000;

const gameController = {
  async getGameNames(req, res, next) {
    const {data: names} = await axios.get(`http://localhost:8000/games`);
    if (names && Array.isArray(names)) {
      // return res.json(names);
    }
    return next(createError(401, 'Internal Server Error'));
    // return res.json([
    //   {name: 'ultimate-xo'}
    // ]);
  },

  async createGameByName(req, res, next) {
    const {gameName, userId} = req.body;
    // const {user} = req;

    const found = await playerQueue.getOnePlayer('gameName');
    if (found === null) {
      playerQueue.addPlayer(gameName, userId);
      setTimeout(() => {
        playerQueue.removePlayer(gameName, userId);
      }, QUEUE_TIMEOUT);
    }

    // Remove the matched opponent from the queue
    playerQueue.remove(gameName, found.userId);
    const opponent = await User.findById(oponentId);

    if (oponent == null) {
      // log the error
    }

  },


};

export default gameController;
