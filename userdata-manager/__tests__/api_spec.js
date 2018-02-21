const Api = require('../index');
const mongoose = require('mongoose');
const Record = require('../models/record');
describe('api __tests__', () => {
  beforeAll(function (done) {
    require('./connectTestDB')(() => done());
  });
  const api = new Api();

  describe("save record", () => {
    let saveRes = {};
    beforeAll(function (done) {
      api.saveRecord(
        {
          articleId: '111111111111',
          data: [1, 2, 3],
          user: '313131313131313131313134'
        })
        .then(function (res) {
          saveRes = res;
          done();
        });
    });

    test('should be success', () => expect(saveRes.success).toBe(true));
    test('should return a record', () => expect(saveRes.record).toBeDefined())
  });
  describe("get record", () => {
    describe('get all record of a user', () => {
      const userId = new mongoose.Types.ObjectId();
      let queryRes = {};
      beforeAll(function (done) {
        Record.collection.drop(function saveARecord(err, res) {
          if (err && err.message !== 'ns not found') throw err;
          Promise.all([
            api.saveRecord({
              articleId: '111111111111',
              data: [1, 2, 3],
              user: userId
            }),
            api.saveRecord({
              articleId: '222222222222',
              data: [1, 2, 3],
              user: userId
            })])
            .then(api.getUserRecords(userId))
            .then(res => {
              queryRes = res;
              done();
            });
        });
      });

      test('should have two record', () => expect(queryRes.length).toBe(2));
    });


    afterAll(function () {
      console.log('disconnect');
      mongoose.disconnect();
    });
  });
});
