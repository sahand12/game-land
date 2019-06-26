import {Router} from 'express';
import gameController from './controllers/gameController';

const router = Router();

router.get('/api/games/list', gameController.getGameNames);

export default router;
