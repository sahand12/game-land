import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const LOGIN_URL = '/login';

passport.serializeUser((user, done) => done(user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: 'mobile' },
    async (mobile, password, done) => {
      try {
        const user = await User.findOne({ mob: mobile });
        if (!user) {
          return done(null, false, { msg: `mobile ${mobile} not found.` });
        }

        const isMatch = await User.comparePassword(user.pass, password);
        if (!isMatch) {
          return done(null, false, {
            msg: `Invalid mobile number or password`,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

/**
 * Login Required middleware
 */
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}

/**
 * Authorization Required middleware
 */
function isAuthorized(req, res, next) {
  throw new Error('no implemented');
}

export { isAuthenticated, isAuthorized };
