const mongoose = require('mongoose');
const Manager = require('../lib/manager');
const should = require('should');
const Record = require('../models/record');

describe("record manager __tests__", function () {
  let manager = new Manager();
  before(function (done) {
    require('./connectTestDB')(function () {
      done();
    });
  });

  describe("save record", function () {
    let saveRes = {};
    before(function (done) {
      manager.save(
        {
          articleId: '111111111111',
          data: [1, 2, 3],
          user: 'mock user'
        })
        .then(function (res) {
          saveRes = res;
          done();
        });
    });

    it('should be success', () => saveRes.success.should.equal(true));
    it('should return a record', () => saveRes.record.should.be.defined)
  });

  describe("get record", function () {
    describe('get all record of a user', function () {
      const userId = new mongoose.Types.ObjectId();

      let queryRes = {};
      before(function (done) {
        Record.collection.drop(function saveARecord(err, res) {
          if (err && err.message !== 'ns not found') throw err;
          Promise.all([
            manager.save({
              articleId: '111111111111',
              data: [1, 2, 3],
              user: userId
            }),
            manager.save({
              articleId: '222222222222',
              data: [1, 2, 3],
              user: userId
            })])
            .then(manager.getUserRecords(userId))
            .then(res => {
              queryRes = res;
              done();
            });
        });
      });

      it('should have two record', () => queryRes.length.should.equal(2));
    });

    after(function () {
      console.log('disconnect');
      mongoose.disconnect();
    });

  });
});
