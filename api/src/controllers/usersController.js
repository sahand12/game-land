// import isEmail from 'validator/lib/isEmail';

class UsersController {
  async getAllUsers(req, res, next) {
    const { userModel } = req.app.get('models');
    try {
      const users = await userModel.findAll();
      return res.json({ success: true, data: users });
    } catch (err) {
      console.error(err.message, err.stack);
      return res.json({ success: false, errors: { message: 'Server Error' } });
    }
  }

  // 1. req: User sends his phone number `body: {mob}`
  //    res: Server returns a success message and creates a registration code for a user
  //    errors:
  //        1. The user is already registered.
  //        2. The user is banned.
  //        3. The code sender process is down
  //        4. Server error
  register(req, res, next) {
    const { userModel } = req.app.get('models');
    const { mobNum } = req.body;
  }

  createUser(req, res, next) {
    const { mob } = req.body;
    return res.send('not implemented');
  }
}

const usersController = new UsersController();
export default usersController;
