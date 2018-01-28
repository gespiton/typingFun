
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
          result: result
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
        resolve({ success: true, result: result });
      });
    });
  }

  findArticleById(id) {
    return new Promise(resolve => {
      Article.findOne({ '_id': id }, function (err, res) {

        console.log(err);

        console.log(res);

        if (err) {
          resolve({ success: false, msg: err });
          return;
        }
        resolve({ success: true, data: res });
      });
    });
  }

  getArticleIndex() {
    //todo: it seems I can't select certain fileds of children
    const that = this;

    return new Promise(resolve => {
      Article.find({})
        .select('-text')
        .sort('name')
        .exec(function (err, res) {
          if (err) resolve({ success: false, msg: err });
          resolve({ success: true, result: that.buildIndex(res) });
        });
    });
  }

  buildIndex(src) {
    const result = [];

    src.forEach(element => {
      result.push(this.build(element));
    });

    return result;
  }

  build(element) {
    const res = {
      name: element.name,
      charNum: element.charNum,
      id: element._id
    };

    if (element.sub.length > 0) {
      const sub = [];
      element.sub.forEach(ele => sub.push(this.build(ele)));
      res.sub = sub;
    }
    return res;
  }
}

module.exports = Dao;