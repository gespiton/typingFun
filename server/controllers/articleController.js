const articleManager = require("../../localModules").articleManager;

function main(router) {
  router.route('/article')
    .get((req, res) => {
      articleManager.findArticleByName('default')
        .then(result => {
          console.log(result);
          res.json(result);
        });
    });

  router.route('/article/index')
    .get((req, res) => {
      articleManager.getArticleIndex()
        .then(result => res.json(result));
    });

  router.route('/article/:id')
    .get((req, res) => {
      console.log(req.params);


      articleManager.findArticleById(req.params.id)
        .then(result => {
          console.log(result);
          const article = result.data;
          res.json(result);
        });
    });
}

module.exports = main;