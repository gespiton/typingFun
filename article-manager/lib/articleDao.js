const Article = require('../models/Article');

class Dao {
  saveArticle(arg) {
    const article = new Article();
    article.name = arg.name;
    if (arg.text) {
      article.text = arg.text;
      article.charNum = arg.text.length;
    }

    if (arg.sub) {
      const sub = [];

      for (const a of arg.sub) {
        sub.push(this.createArticle(a));
      }

      article.sub = sub;
    }

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

  createArticle(arg) {
    const article = new Article();
    article.name = arg.name;
    article.text = arg.text;
    article.charNum = arg.text.length;
    return article;
  }

  findArticleByName(name) {

    return new Promise(resolve => {
      Article.findOne({ name: name }, function (err, result) {

        if (err) {
          resolve({ success: false, msg: err });
        }

        if (result === null) {
          resolve({ success: false, msg: 'name not existed' });
        }
        resolve({ success: true, article: result });
      });
    });
  }
}

module.exports = Dao;