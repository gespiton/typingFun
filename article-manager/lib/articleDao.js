const Article = require('../models/Article');

class Dao {
  saveArticle(arg) {
    const article = new Article();
    article.name = arg.name;
    article.sub = arg.sub;

    return new Promise(function (resolve) {
      article.save(function (err, result) {
        if (err) {
          resolve({
            success: false,
            msg: err
          });
        }

        resolve({
          success: true,
          article: result
        });
      });
    });
  }
}

module.exports = Dao;