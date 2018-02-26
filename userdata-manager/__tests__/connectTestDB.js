const db = require('mongoose');

module.exports = function (done) {
  db.Promise = global.Promise;
  db.connect('mongodb://127.0.0.1:27017/typingFunTest',
    function (err) {
      if (err) done(err);
      console.log('connect to database typingFunTest');
      done();
    });
};