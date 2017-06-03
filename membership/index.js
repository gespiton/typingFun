const Auth = require('./lib/auth');
const Registration = require('./lib/registration');
const User = require('./models/user');
const MemberShip = function () {
  const self = this;
  self.authenticate = function (email, password, next) {
    const auth = new Auth();
    // auth.on('success', (authRes) => authRes);
    // auth.on('fail', (authRes) => authRes);
    auth.authenticate({email: email, password: password}, next);
  };

  self.findUserById = function (id, done) {
    console.log('findUserById called');
    User.findById(id, function (err, user) {
      done(err, user);
    })
  };

  const registration = new Registration();
  self.register = function (args, next) {
    registration.Register(args, next);
  };

  return self;
};

module.exports = MemberShip;