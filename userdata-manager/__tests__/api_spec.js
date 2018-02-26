const Api = require('../index');
const mongoose = require('mongoose');
const Record = require('../models/record');
describe('api __tests__', () => {
  beforeAll(function (done) {
    require('./connectTestDB')(() => done());
  });
  const api = new Api();

  const sampleTypeResult = {
    "keyStrokes": [{
      "pressedKey": "y",
      "expected": "y",
      "currentTime": 1519195607231,
      "cursorPos": 0
    }, {"pressedKey": "o", "expected": "o", "currentTime": 1519195607387, "cursorPos": 1}, {
      "pressedKey": "u",
      "expected": "u",
      "currentTime": 1519195607479,
      "cursorPos": 2
    }, {"pressedKey": " ", "expected": " ", "currentTime": 1519195607639, "cursorPos": 3}, {
      "pressedKey": "s",
      "expected": "s",
      "currentTime": 1519195607773,
      "cursorPos": 4
    }, {"pressedKey": "h", "expected": "h", "currentTime": 1519195607836, "cursorPos": 5}, {
      "pressedKey": "o",
      "expected": "o",
      "currentTime": 1519195608009,
      "cursorPos": 6
    }, {"pressedKey": "u", "expected": "u", "currentTime": 1519195608040, "cursorPos": 7}, {
      "pressedKey": "l",
      "expected": "l",
      "currentTime": 1519195608269,
      "cursorPos": 8
    }, {"pressedKey": "d", "expected": "d", "currentTime": 1519195608399, "cursorPos": 9}, {
      "pressedKey": " ",
      "expected": " ",
      "currentTime": 1519195608530,
      "cursorPos": 10
    }, {"pressedKey": "t", "expected": "t", "currentTime": 1519195608708, "cursorPos": 11}, {
      "pressedKey": "r",
      "expected": "r",
      "currentTime": 1519195608914,
      "cursorPos": 12
    }, {"pressedKey": "y", "expected": "y", "currentTime": 1519195609034, "cursorPos": 13}, {
      "pressedKey": " ",
      "expected": " ",
      "currentTime": 1519195609182,
      "cursorPos": 14
    }, {"pressedKey": "t", "expected": "t", "currentTime": 1519195609290, "cursorPos": 15}, {
      "pressedKey": "h",
      "expected": "h",
      "currentTime": 1519195609473,
      "cursorPos": 16
    }, {"pressedKey": "a", "expected": "a", "currentTime": 1519195609622, "cursorPos": 17}, {
      "pressedKey": "t",
      "expected": "t",
      "currentTime": 1519195609704,
      "cursorPos": 18
    }],
    "incorrect": 0,
    "total": 18,
    "timeSpent": 2.3,
    "wpf": 93,
    "articleId": "5a814ea9e8d2db24e22ef80b",
    "userEmail": "123@gg.com"
  };


  describe("save record", () => {
    let saveRes = {};
    beforeAll(function (done) {
      api.saveRecord(sampleTypeResult)
        .then(function (res) {
          saveRes = res;
          done();
        });
    });

    test('should be success', () => expect(saveRes.success).toBe(true));
    test('should return a record', () => expect(saveRes.record).toBeDefined());
  });

  describe('get all records of a user', () => {
    const userId = new mongoose.Types.ObjectId();
    let queryRes = {};
    beforeAll(function (done) {
      Record.collection.drop(function saveARecord(err, res) {
        if (err && err.message !== 'ns not found') throw err;
        Promise.all([
          api.saveRecord(sampleTypeResult),
          api.saveRecord(sampleTypeResult)]
        )
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
