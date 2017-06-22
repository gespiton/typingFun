const mongoose = require('mongoose');
const Article = require('../models/article');

function main(req, res) {
  res.render('typing', {page: 'typingPage', title: "typing"})
}

function getAllArticleData(req, res) {
  class Node {
    constructor(text) {
      this.text = text;
      this.nodes = [];
    }
  }

  Article.find({}, function (err, result) {
    if (err) throw err;
    let resArr = [];
    result.forEach(doc => {
      let node = new Node(doc.name);
      let counter = 1;
      doc.sub.forEach(content => node.nodes.push({text: counter++, href: content._id}));
      resArr.push(node);
    });

    res.json(resArr);
  });
}

function getArticleById(req, res) {

  //todo body parser
  Article.findOne(
    {"sub._id": mongoose.Types.ObjectId(req.body.id)},
    {"sub.$": true},
    function (err, article) {
      console.log(err);
      if (err) {
        console.log(err);
        res.json({});
        return;
      }
      // console.log(article.sub);
      res.json(
        {
          text: article.sub[0].text,
          charNum: article.sub[0].charNum,
          articleId: article._id
        }
      );
    });
}

function recordTypingResult(req, res) {
  console.log(req.body);
  console.log('request received');
  res.json({success: true});
}
module.exports = {
  actionList: [
    {action: 'get', func: main, url: '/'},
    {action: 'get', func: getAllArticleData, url: '/getArticleData'},
    {action: 'post', func: getArticleById, url: '/getArticle'},
    {action: 'post', func: recordTypingResult, url: '/recordResult'}
  ]
};