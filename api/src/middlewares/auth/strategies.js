import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// Strategies require what is known as a verify callback.
// The purpose of a verify callback is to find the user that
// possesses a set of credentials.

// When passport authenticates a request, it parses the credentials contained in the
// request. It then Invokes the verify callback with those credentials as arguments,
// in this case 'username' and 'password'. If the credentials are valid, the verify
// callback invokes 'done' to supply Passport with the user that authenticated.
// return done(null, user)
passport.use(
  new LocalStrategy(async function localStrategyVerifyCallback(username, password, done) {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'user not found' });
      }
      if (!isPasswordValid(user.password, password)) {
        return done(null, false, { message: 'invalid password' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
