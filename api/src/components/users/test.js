import { MongoClient } from 'mongodb';
import { UserService, UserFlowService, SmsService } from './user';

const url = 'mongodb://localhost:27017';
const dbName = 'game-land-test';
const client = new MongoClient(url, { useNewUrlParser: true });

client.connect(async err => {
  if (err) {
    console.log('Failed to connect to mongodb');
    console.error(err);
    process.exit(1);
  }

  const db = client.db(dbName);
  // const userService = new UserService(db);
  // const smsService = new SmsService();
  // const userFlowService = new UserFlowService({ userService, smsService });

  const newUser = await db.collection('users').insertOne({
    mob: '09123017212',
    psw: null,
    rgs: {
      tkn: 1234,
      sat: null,
      exp: null,
    },
  });

  const updatedUser = await db
    .collection('users')
    .findOneAndUpdate(
      { mob: '09123017212' },
      { $set: { 'rgs.sat': Date.now(), 'rgs.exp': Date.now() + 5 * 60 * 1000 } }
    );

  console.log(updatedUser);
  // userService
  //   .createOne({
  //     mob: '09126150383',
  //     password: 'sahand12',
  //     email: 'sahand.shok@gmail.com',
  //   })
  //   .then(res => {
  //     console.log(res);
  //     return res;
  //   })
  //   .then(user => userFlowService.sendRegistrationCode({ userId: user._id }))
  //   .then(res => console.log(res))
  //   .catch(error => {
  //     console.log('user creation error');
  //     console.error(error);
  //   })
  //   .finally(() => {
  //     client.close();
  //     process.exit(1);
  //   });
});
