const Registration = require('../lib/registration');
const db = require('mongoose');
const Auth = require('../lib/auth');
const User = require('../models/user');
const assert = require('assert');
const should = require('should');


describe('Authentication', function () {
  const registration = new Registration();
  let auth = new Auth();
  before(function (done) {
    db.connect('mongodb://127.0.0.1:27017/typingFun',
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

  describe('a valid login', function () {
    let authResult = {};
    before(function (done) {
      auth.authenticate({email: '123@me.com', password: 'freedom'}, function (err, res) {
        assert.ok(err === null, err);
        authResult = res;
        done();
      })
    });

    it('is successful', () => authResult.success.should.equal(true));
    it('return a user', () => should.exist(authResult.user));
    it('updates the user stats', () => authResult.user.status.should.equal('online'));
  });

  after(function (done) {
    db.disconnect(function (err) {
      if (err) throw err;
      done();
    })
  })
});
