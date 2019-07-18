import { isIRMobNumber } from '../../validation';
const USER_STATUSES = {
  PENDING_SENDING_REGISTRATION_CODE: 'PENDING_SENDING_REGISTRATION_CODE',
  PENDING_REGISTRATION_VERIFICATION: 'PENDING_REGISTRATION_VERIFICATION',
  VERIFIED_REGISTRATION_AND_PENDING_PASSWORD_CREATION:
    'VERIFIED_REGISTRATION_AND_PENDING_PASSWORD_CREATION',
  COMPLETED: 'COMPLETED',
};

class UserService {
  constructor(db) {
    this.db = db;
    this.collection = this.db.collection('users');
  }

  _validateCreateOne({ mob }) {
    if (isIRMobNumber(mob)) {
      return true;
    }
    const error = new Error('Invalid mobile number');
    error.type = 'ValidationError';
    throw error;
  }

  async createOne({ mob }) {
    /**
     * 0. validate mobile number
     * 1. check and see if mob is not taken
     * 2. build a new user obj
     * 3. add registration code
     * 4. save the user to db
     */

    // 0
    this._validateCreateOne({ mob });

    // 1
    const isMobTaken = await this.collection.findOne({ mob });
    if (isMobTaken !== null) {
      throw new Error('Mobile number already taken');
    }

    // 2 & 3
    const user = {
      mob, // mobileNumber
      adm: false, // isAdmin
      eml: null, // email
      pwd: null, // password
      // account
      mbvf: false, // mobileVerified
      emvf: false, // emailVerified
      rgs: {
        // registration
        tkn: Math.floor(Math.random() * 1e4),
        sat: null, // sentAt
        exp: null, // expiresAt
        dst: 'MOBILE', // destination: mobile | email
      },
      sts: USER_STATUSES.PENDING_SENDING_REGISTRATION_CODE, // status

      avtId: null, // avatar
    };

    // 4
    const dbInsertResult = await this.collection.insertOne(user);
    if (dbInsertResult.result.ok === 1 && dbInsertResult.insertedCount === 1) {
      return dbInsertResult.ops[0];
    }
    console.error(dbInsertResult);
    throw new Error('Could not create user right now');
  }

  async findById(id) {
    // @TODO need to filter the returned result (maybe??)
    return this.collection.findOne({ _id: id });
  }

  async updateOne(filterQuery, newData, opts) {
    const user = await this.collection.findOne(filterQuery);
    if (user === null) {
      throw new Error('User not found');
    }

    const newUser = Object.assign({}, user, newData);
    const errors = this.validate(newUser);
    if (errors.length !== 0) {
      const error = Error('Can not update the user');
      error.type = 'ValidationError';
      error.errors = errors;
      throw error;
    }

    return this.collection.updateOne({ _id: user._id }, newUser);
  }

  // @TODO: To be implemented
  validate(data) {
    return [];
  }
}

class UserFlowService {
  constructor({ userService, emailService, smsService }) {
    this.userService = userService;
    this.emailService = emailService;
    this.smsService = smsService;
  }

  async sendRegistrationCode({ userId }) {
    /**
     * 1. find the user from the db
     *   errors:
     *     1. already verified
     *     2. user not found
     * 2. retrieve the registration token
     * 3. send the token and upon success update the user accordingly
     * 4. success
     */

    // 1.
    console.log(userId);
    const user = await this.userService.findById(userId);
    if (user === null) {
      throw new Error('User not found');
    }

    if (user.sts !== USER_STATUSES.PENDING_SENDING_REGISTRATION_CODE) {
      throw new Error('Already verified'); // @TODO: a better msg
    }

    try {
      await this.smsService.sendRegistrationCode(user.rgs.tkn);
      await this.userService.updateOne(
        { id: user.id },
        {
          sts: 'PENDING_REGISTRATION_VERIFICATION',
          rgs: {
            tkn: user.rgs.tkn,
            sat: Date.now(),
            exp: Date.now() + 5 * 60 * 1000, // + 5 minutes
            dst: 'MOBILE',
          },
        }
      );
    } catch (err) {
      throw err;
    }
  }
}

class SmsService {
  async sendRegistrationCode(code) {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
}

export { UserService, UserFlowService, SmsService };
