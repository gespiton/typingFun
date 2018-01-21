/**
 * Created by sher on 27/5/2017.
 */
const mongoose = require('mongoose');
const Article = require('../server/models/article');
const fs = require('fs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/typingFun', function (err, db) {
  if (err) throw err;
  else console.log('connected to db');


  const book = fs.readFileSync('./prince.txt', {encoding: 'utf-8'});
  const arr = book.split('\n');


  let curArticle = '';
  const saved = new Article();

  saved.name = 'The little prince';
  arr.forEach(line => {
    if (line.length === 0) return;
    if (line.startsWith('\tChapter')) {
      if (curArticle.length > 0) {
        saved.sub.push({text: curArticle, charNum: curArticle.length});
        curArticle = '';
      }
    } else {
      curArticle += line;
    }
  });

  saved.save(function (err) {
    console.log(err);
    mongoose.disconnect();
  });
});

