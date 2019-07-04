import User from './User';
import MongoAdaptor from './adapters/MongoAdapter';

function initModels(app) {
  // init db adapter
  const db = app.get('db');
  const dbClient = app.get('dbClient');
  const mongoAdapter = new MongoAdaptor(dbClient, db);

  //
  app.set('models', {
    userModel: new User(mongoAdapter),
  });
}

export default initModels;
