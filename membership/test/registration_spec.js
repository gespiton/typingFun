const Registration = require('../lib/registration');
const Verifier = require('../models/Application');
const db = require('mongoose');
let User = require('../models/user');
require('should');

describe("registration", function () {
  const registration = new Registration();

  const createUserGetResult = function (user, done) {
    User.collection.drop(function (err, result) {
      if (err && err.message !== 'ns not found') throw err;
      console.log('db cleared');
      registration.Register(user,
          function (err, result) {
            done(result);
          });
    });
  };

  before(function (done) {
    require('./connectTestDB')(done);
  });


  describe("a valid application", function () {
    let regResult = {};
    before(function (done) {
      createUserGetResult(
          {
            username: 'hi',
            email: "123@me.com",
            password: "freedom",
            confirm: "freedom"
          },
          function (res) {
            regResult = res;
            done();
          });
    });

    it("is successful", () => regResult.success.should.equal(true));
    it("create a user", () => regResult.user.should.be.defined)
  });

  describe("an empty or null email", function () {
    let regResult = {};
    before(function (done) {
      createUserGetResult(
          {
            username: 'ha',
            email: null,
            password: "freedom",
            confirm: "freedom"
          },
          function (res) {
            regResult = res;
            done();
          }
      );
    });

    it("is not successful", () => regResult.success.should.equal(false));
    it("tells user that email is required", () => regResult.message.should.equal("Email and password are required"));
  });

  describe("password and confirm not match", function () {
    let regResult = null;
    before(function (done) {
      createUserGetResult(
          {
            username: 'ha',
            email: '123@me.com',
            password: "freedom",
            confirm: "freedom1"
          },
          function (res) {
            regResult = res;
            done();
          }
      );
    });

    it("is not successful", () => regResult.success.should.equal(false));
    it("message is : password and confirm not match", () => regResult.message.should.equal("password and confirm not match"));
  });

  describe("user already exist", function () {
    let regResult = null;
    before(function (done) {
      const user = {
        username: 'ha',
        email: '123@me.com',
        password: "freedom",
        confirm: "freedom"
      };

      User.collection.drop(function (err) {
        if (err && err.message !== 'ns not found') throw err;
        console.log('db cleared');
        registerTwice();
      });

      function registerTwice() {
        registration.Register(user,
            function (err, result) {
              if (err) throw err;
              registration.Register(user,
                  function (err, result) {
                    if (err) throw err;
                    regResult = result;
                    done();
                  });
            });
      }
    });

    it("is not successful", () => regResult.success.should.equal(false));
    it("message is: This email is used", () => regResult.message.should.equal("This email is used"));
    it("user should be null", () => (regResult.user === null).should.be.ok());
  });

  describe("user name missing", function () {
    let regResult = null;
    before(function (done) {
      const user = {
        email: '123@me.com',
        password: "freedom",
        confirm: "freedom"
      };

      User.collection.drop(function (err) {
        if (err && err.message !== 'ns not found') throw err;
        createUserGetResult(
            user,
            function (res) {
              regResult = res;
              done();
            }
        );
      });
    });

    it("is not successful", () => regResult.success.should.equal(false));
    it("message is : username missing", () => regResult.message.should.equal("username missing"));
  });


  after(function (done) {
    db.disconnect(function (err) {
      if (err) throw err;
      done();
    });
  });
});