const passport = require('passport');
const membership = require('../../membership');

module.exports = {
  login: function (req, res, next) {
    console.log(req.body);

    function authenticateSuccess(user, info) {
      return user && info.success;
    }

    passport.authenticate('local', function (err, user, info) {
      console.log('user', user);
      if (err) console.log(err);
      if (authenticateSuccess(user, info)) {
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.json({logged: info.success, message: info.message, username: user.username, email: user.email});
        });
      } else {
        res.json({logged: info.success, message: info.message});
      }
    })(req, res, next);
  },

  register: function (req, res, next) {
    membership.register(
        {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
          confirm: req.body.confirm
        },
        function (err, result) {
          console.log(err, result);
          // next(result);
          res.json(result);
          // if (err) {
          //   console.log(err);
          //   next({success: false, message: 'internal fail'});
          // } else {
          //   next(result);
          // }
        }
    );
  }
};