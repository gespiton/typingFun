const db = require('mongoose');

module.exports = function (done) {
  db.connect('mongodb://127.0.0.1:27017/typingFunTest',
    function (err, db) {
      if (err) done(err);
      done();
    });
};