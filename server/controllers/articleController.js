const RecordManager = require('../../userdata-manager');
const recordManager = new RecordManager();

function main(router) {
  router.route('/article')
      .get((req, res, next) => {

      });
}

export default main;