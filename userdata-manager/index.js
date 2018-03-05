const Manager = require('./lib/manager');
const manager = new Manager();

module.exports = {
  saveRecord(record) {
    return manager.save(record);
  },

  getUserRecords(userEmail) {
    return manager.getUserRecords(userEmail);
  }
};
