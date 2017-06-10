const Registration = require('../lib/registration');
const User = require('../models/user');
const assert = require('assert');
const should = require('should');
const Memb = require('../index');
const db = require('mongoose');


describe('api test', function () {
  const memb = new Memb();
  before(function (done) {
    require('./connectTestDB')(done);
  });

  describe('test registration', function () {
    let regResult = {};
    before(function (done) {
      User.collection.drop(
        function (err, res) {
          if (err && err.message !== 'ns not found') throw err;
          memb.register(
            {
              username: 'hi',
              email: "123@me.com",
              password: "freedom",
              confirm: "freedom"
            },
            function (err, result) {
              if (err) throw err;
              regResult = result;
              done();
            });
        });
    });

    it('register success', () => regResult.success.should.equal(true));
    it('has a user', () => regResult.user.should.be.defined);
    it('user is right', () => {
      regResult.user.username.should.equal('hi');
      regResult.user.email.should.equal('123@me.com');
      regResult.user.password.should.equal('freedom');
    });
  });

  describe('test authentication', function () {
    let authResult = {};
    before(function (done) {
      memb.authenticate('123@me.com', 'freedom', function (err, res) {
        authResult = res;
        done();
      })
    });

    it('log in success', () => authResult.success.should.equal(true));
    it('has a user', () => authResult.user.should.be.defined);
  });
  after(function (done) {
    db.disconnect(function (err) {
      if (err) throw err;
      done();
    })
  })
});