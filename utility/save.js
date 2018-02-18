const mongoose = require('mongoose');
const articleManager = require("../article-manager");
const fs = require('fs');

const article = {
  name: 'default',
  text: 'yyou should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should you should try that you really should ou should try that you really should '
};

const simpleArticle = {
  name: 'simple',
  text: 'this is a simple article'
};
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1:27017/typingFun', function (err, db) {
  if (err) throw err;
  else console.log('connected to db typingFun');

  mongoose.connection.db.dropCollection('articles')
    .catch((err) => {
      if (err && err.message !== 'ns not found') throw err;
    })
    .then(() => {
      return articleManager.saveArticle(article);
    })
    .then(() => {
      return articleManager.saveArticle(genBook());
    })
    .then(()=>{
      return articleManager.saveArticle(simpleArticle);
    })
    .then(() => {
      return mongoose.disconnect();
    })
    .catch(err => {
      console.log(err);
    });


});

function genBook() {

  const book = fs.readFileSync('./prince.txt', {encoding: 'utf-8'});
  const arr = book.split('\n');


  let curArticle = '';
  const saved = {
    name: 'The little prince',
    sub: []
  };

  let counter = 1;
  arr.forEach((line, index) => {
    if (line.length === 0) return;
    if (line.startsWith('\tChapter')) {
      if (curArticle.length > 0) {
        saved.sub.push({name: counter++, text: curArticle, charNum: curArticle.length});
        curArticle = '';
      }
    } else {
      curArticle += line;
    }
  });

  return saved;
}