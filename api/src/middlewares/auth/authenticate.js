import passport from 'passport';



function authenticateMiddleware(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err){return next(err);}
    if (!user) {return res.redirect('/login');}

    req.logIn(user, error => {
      if (error) { return next(error); }
      return res.redirect(`/users/${user.user.name}`);
    })
  })(req, res, next);
}

export {authenticateMiddleware, configurePassport};
