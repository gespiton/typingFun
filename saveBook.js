/**
 * Created by sher on 27/5/2017.
 */
const mongoose = require('mongoose');
const Article = require('./web/models/article');
const fs = require('fs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/typingFun', function (err, db) {
    if (err) throw err;
    else console.log('connected to db');
}).then();


Article.collection.drop(function () {
    console.log('done');
});

function saveBook() {
    const book = fs.readFileSync('./prince.txt', {encoding: 'utf-8'});
    const arr = book.split('\r\n');


    let curArticle = '';
    let res = [];
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
    saved.save();
    console.log(saved.sub[1]);
}
// saveBook();
// let res = Article.find(function (err,result) {
//     console.log(result[result.length-1]);
// });
// mongoose.disconnect();
// console.log(res);

// console.log(book.split('\r\n'));
