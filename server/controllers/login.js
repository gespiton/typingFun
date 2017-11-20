/**
 * Created by sher on 27/5/2017.
 */
const passport = require('passport');
const Memb = require('../../membership');

function main(router) {
  router.route('/sign')
      .post(function (req, res, next) {
        function authenticateSuccess(user, info) {
          return user && info.success;
        }

        passport.authenticate('local', function (err, user, info) {
          if (err) console.log(err);
          if (authenticateSuccess(user, info)) {
            req.logIn(user, function (err) {
              if (err) {
                return next(err);
              }
              return res.json({logged: info.success, message: info.message, username: user.username});
            });
          } else {
            res.json({logged: info.success, message: info.message, username: user.username});
          }
        })(req, res, next);
      });

  const memb = new Memb();
  router.route('/register')
      .post(function (req, res) {
        memb.register(
            {
              email: req.body.email,
              password: req.body.password,
              username: req.body.username,
              confirm: req.body.confirm
            },
            function (err, result) {
              if (err) {
                console.log(err);
                res.json({success: false, message: 'internal fail'});
              } else {
                return res.json(result);
              }
            }
        );
      });
}

module.exports = main;
