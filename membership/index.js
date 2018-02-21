const Auth = require('./lib/auth');
const Registration = require('./lib/registration');
const User = require('./models/user');

const auth = new Auth();
const registration = new Registration();

const MemberShip = {
  authenticate(email, password, next) {
    auth.authenticate({email, password}, next);
  },

  /**
   *
   * @param args
   *    {
   *      username, email, password, confirm
   *    }
   * @param next
   */
  register(args, next) {
    registration.Register(args, next);
  },

  findUserById(id, next) {
    User.findById(id, function (err, user) {
      next(err, user);
    });
  }
};

module.exports = MemberShip;