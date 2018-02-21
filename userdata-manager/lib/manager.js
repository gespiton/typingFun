const Record = require('../models/record');
const membership = require('membership');

class Manager {

  save(args) {
    return new Promise(function (resolve) {
      const record = new Record();
      record.user = args.user;
      record.keyStrokes = args.keyStrokes;
      record.articleId = args.articleId;
      record.wpf = args.wpf;
      record.incorrect = args.incorrect;
      record.total = args.total;
      record.timeSpent = args.timeSpent;

      record
        .save()
        .then(function (res) {
          resolve({success: !!res, record: res});
        })
        .catch(function (err) {
          resolve({success: false, message: err});
        });
    });
  }

  getUserRecords(userId) {
    return new Promise(function (resolve, reject) {

      Record.find({user: userId})
        .then(function (res) {
          resolve(res);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }
}

module.exports = Manager;