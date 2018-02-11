const Article = require('../models/Article');

class Dao {
  saveArticle(arg) {
    const article = new Article();
    const that = this;
    article.name = arg.name;
    if (arg.text) {
      article.text = arg.text;
      article.charNum = arg.text.length;
    }

    if (arg.sub) {
      // assume that the nested article only has one level
      const subOpts = [];

      for (const a of arg.sub) {
        subOpts.push(that.saveArticle(a));
      }

      return Promise.all(subOpts)
        .then(results => {
          article.sub = results.map(result => result.result._id);
          return that._save(article);
        });
    }

    return this._save(article);

  }

  _save(article) {
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
          result: result
        });
      });
    });
    
  }

  findArticleByName(name) {

    return new Promise(resolve => {
      Article.findOne({'name': name}, function (err, result) {
        if (err) {
          resolve({success: false, msg: err});
        }

        if (result === null) {
          resolve({success: false, msg: 'name not existed'});
        }
        resolve({success: true, result: result});
      });

    });
  }

  findArticleById(id) {
    return new Promise(resolve => {
      Article.findOne({'_id': id}, function (err, res) {
        if (err) {
          resolve({success: false, msg: err});
          return;
        }
        resolve({success: true, result: res});
      });
    });
  }

  getArticleIndex() {
    //todo: it seems I can't select certain fields of children
    const that = this;

    return new Promise(resolve => {
      //todo find article with no children
      Article.find({})
        .select('-text')
        .exec(function (err, res) {
          if (err) resolve({success: false, msg: err});

          resolve({success: true, result: that.buildIndex(res)});
        });
    });
  }


  buildIndex(src) {
    const idToArticle = {};
    const articles = [];

    src.forEach(doc => {
      const article = {
        name: doc.name,
        id: doc.id,
        _sub: doc.sub,
        sub: [],
        charNum: doc.charNum
      };

      articles.push(article);
      idToArticle[doc.id] = article;
    });

    articles.forEach(article => {
      if (article._sub.length > 0) {

        article._sub.forEach(id => {
          const a = idToArticle[id];
          a.bottom = true;
          article.sub.push(a);
        });
      }
    });

    return this._sortIndexes(articles.filter(article => !article.bottom));
  }

  _sortIndexes(indexes) {
    indexes.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return indexes;
  }
}

module.exports = Dao;