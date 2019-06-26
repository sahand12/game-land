import axios from 'axios';
import createError from 'http-errors';

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

  async create(req, res, next) {
    const {gameName} = req.body;
    const {user} = req;
    const oponentId = await playerQueue.get('gameName');
    if (oponentId === null) {
      playerQueue.add(gameName, userId);
      setTimeout(() => {
        playerQueue.remove(gameName, userId);
      }, QUEUE_TIMEOUT);
    }

    //
    playerQueue.remove(gameName, userId);
    const oponent = await User.findById(oponentId);

    if (oponent == null) {
      // log the error
    }

  },
};

export default gameController;
