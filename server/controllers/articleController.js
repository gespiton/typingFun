const articleManager = require("../../article-manager/index");

function main(router) {
  router.route('/article')
    .get((req, res, next) => {
      articleManager.findArticleByName('default')
        .then(result => {
          res.json(result);
        });
    });

  router.route('/article/index')
    .get((req, res) => {
      articleManager.getArticleIndex()
        .then(result => res.json(result));
    });

  router.route('/article/:id')
    .get((req, res, next) => {
      console.log(req.params);


      articleManager.findArticleById(req.params.id)
        .then(result => {
          console.log('hahahhah');
          const article = result.data;
          res.json(result);
        });
    });
}

module.exports = main;