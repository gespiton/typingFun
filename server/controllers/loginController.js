const membershipService = require('../service/membershipService');

function main(router) {
  router.route('/login')
      .post((req, res, next) => membershipService.login(req, res, next));

  router.route('/register')
      .post((req, res, next) => membershipService.register(req, res, next));

  router.route('/me')
      .get((req, res, next) => {
        console.log(req.user);
        const user = req.user;
        if (user) {
          res.json({username: user.username, email: user.email});
        } else {
          res.json({});
        }
      });
}

module.exports = main;
