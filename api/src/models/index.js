import User from './User';
import MongoAdaptor from './mongoAdapter';

function initModels(app) {
  // init db adapter
  const mongoAdapter = new MongoAdaptor(app.dbClient, app.db);

  //
  app.set('models', {
    users: new User(mongoAdapter),
  });
}

export default initModels;
