const Auth = require('./lib/auth');
const Registration = require('./lib/registration');
const User = require('./models/user');
// const MemberShip = function () {
//   const self = this;
//   self.authenticate = function (email, password, next) {
//     const auth = new Auth();
//     auth.authenticate({email: email, password: password}, next);
//   };
//
//   self.findUserById = function (id, done) {
//     User.findById(id, function (err, user) {
//       done(err, user);
//     });
//   };
//
//   const registration = new Registration();
//   self.register = function (args, next) {
//     registration.Register(args, next);
//   };
//
//   return self;
// };

const auth = new Auth();
const registration = new Registration();

class MemberShip {
  authenticate(email, password, next) {
    auth.authenticate({email, password}, next);
  }

  register(args, next) {
    registration.Register(args, next);
  }

  findUserById(id, next) {
    User.findById(id, function (err, user) {
      next(err, user);
    });
  }
}

module.exports = MemberShip;