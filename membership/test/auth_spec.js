const Registration = require('../lib/registration');
const db = require('mongoose');
const Auth = require('../lib/auth');
const User = require('../models/user');
const assert = require('assert');
const should = require('should');


describe('Authentication', function () {
  const registration = new Registration();
  let auth = new Auth();

  function authenticateUserGetResult(user, done) {
    auth.authenticate(user, function (err, res) {
      if (err) throw err;
      done(res);
    })
  }

  before(function (done) {
    require('./connectTestDB')(
      function (err, db) {
        if (err) throw err;
        User.collection.drop(
          function (err, result) {
            if (err && err.message !== 'ns not found') throw err;
            registration.Register(
              {
                username: 'hi',
                email: "123@me.com",
                password: "freedom",
                confirm: "freedom"
              },
              function (err, result) {
                if (err) throw err;
                done();
              });
          });
      });
  });

  describe('a valid sign', function () {
    let authResult = {};
    before(function (done) {
      authenticateUserGetResult(
        {email: '123@me.com', password: 'freedom'},
        function (res) {
          authResult = res;
          done();
        }
      );
    });

    it('is successful', () => authResult.success.should.equal(true));
    it('return a user', () => should.exist(authResult.user));
    it('updates the user stats', () => authResult.user.status.should.equal('online'));
  });

  describe('user doesnt exist', function () {

  });

  after(function (done) {
    db.disconnect(function (err) {
      if (err) throw err;
      done();
    });
  })
});
