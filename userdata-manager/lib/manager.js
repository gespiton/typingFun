const mongoose = require('mongoose');
const Record = require('../models/record');
const Emitter = require('events').EventEmitter;

class Manager extends Emitter {

  constructor() {
    super();
    // this.emit('done');
    // this.on('done', this.save);
  }

  save(args) {
    return new Promise(function (resolve, reject) {
      const record = new Record();
      record.user = args.user;
      record.data = args.data;
      record.articleId = mongoose.Types.ObjectId(args.articleId);

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
      let id;
      if (typeof userId === 'string') {
        id = mongoose.ObjectId(userId);
      } else {
        throw 'unknown type';
      }
      console.log('type', id instanceof mongoose.Types.ObjectId);
      Record.findById(userId)
        .then(function (res) {
          resolve(res)
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }
}

module.exports = Manager;