import { Router } from 'express';
import {
  gamesController,
  matchesController,
  usersController,
} from './controllers';

const router = Router();

// router.get('/games/list', gamesController.getGameNames);

router.route('/users')
  .get(usersController.getAllUsers)
  .post(usersController.validateCreateUserInput, usersController.createUser);

/** User Registration Process ** */
// 1. req: User sends his phone number `body: {mob}`
//    res: Server returns a success message and creates a registration code for a user
//    errors:
//        1. The user is already registered.
//        2. The user is banned.
//        3. The code sender process is down
//        4. Server error
router.post('/users/register', (req, res, next) => {
  const {mob} = req.body;
  return next();
}, usersController.register);

// 2. req: User enters the server-sent code `body: {code, mob} & auth header`
//    res: Server verifies the code and returns a success message.
//    errors:
//      1. There is no corresponding server generated code for the user. (user not found)
//      2. The provided code is invalid. (max of 3 tries)
//      3. The user is banned.
//      4. Server error
router.post('/users/register/validate', usersController.validateRegistrationCode);

// 3. req: User chooses a password `body: {mob, pass} & authorization header`
//    res: Server finalize user registration process and sends and auth code;
//    errors:
//      1. There is not corresponding user at the server.
//      2. The user is not verified.
//      3. The password errors.
//      4. Interval Server Error.
router.post('/users/register/create', usersController.createPassword);


function initRouter(app) {
  app.use('/api', router);
}

export default initRouter;
