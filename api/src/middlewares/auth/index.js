import passport from 'passport';
import addLocalStrategy from './strategies';

function configurePassport(app) {
  // Serialize user (what get set in the session)
  passport.serializeUser((user, done) => done(null, user.id));

  // Deserialize user (get user by data that is saved in the session)
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await app.get('models').users.findById(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
}

function addStrategies(app) {
  addLocalStrategy(app);

}

function initPassport(app) {
  // passport configuration logic
  configurePassport(app);

  // Different modes of authentication
  addStrategies(app);
}

export default initPassport;
