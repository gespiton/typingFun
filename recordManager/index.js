const Manager = require('./lib/manager');
const RecordManager = function () {
  const self = this;
  const manager = new Manager();

  self.saveRecord = function (record) {
    return manager.save(record);
  };

  self.getUserRecords = function (id) {
    return manager.getUserRecords(id);
  };

  return self;
};
module.exports = RecordManager;
