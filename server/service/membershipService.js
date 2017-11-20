const passport = require('passport');
const Membership = require('../../membership');

const membership = new Membership();
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
          return res.json({logged: info.success, message: info.message, username: user.username});
        });
      } else {
        res.json({logged: info.success, message: info.message, username: user.username});
      }
    })(req, res, next);
  },
  register: function (req, res) {
    membership.register(
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
  }

};