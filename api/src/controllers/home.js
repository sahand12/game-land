const home = {

  /**
   * GET /
   * Home page.
   */
  index(req, res, next) {
    return res.json({title: 'home'});
  }
};

export default home;
