const Manager = require('./lib/manager');
const manager = new Manager();

class ArticleManager {
  saveRecord(record) {
    return manager.save(record);
  }

  getUserRecords(id) {
    return manager.getUserRecords(id);
  }
}

module.exports = ArticleManager;
