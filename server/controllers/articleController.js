const articlManager = require("../../article-manager/index");

function main(router) {
  router.route('/article')
    .get((req, res, next) => {
      articlManager.findArticleByName('default')
        .then(result => {
          res.json(result);
        });
    });
}

module.exports = main;