/**
 * Created by liliz on 2017/2/1.
 */
//visit by /dbs,you can add chapters to database
var express = require('express');
// var fs = require('fs');
// var formidable = require('formidable');
var book = require('./book.js');
var dbs = express.Router();

dbs.get('/',function (req,res) {
    // var dbs = fs.readFileSync('./routes/db.html','utf-8');
    // res.end(dbs);
    res.render('CustomArticle.jade');
});
dbs.post('/',function(req,res){
    console.log(req.body);

    var title = req.body.title;
    var content = req.body.content;
    res.send(title+"\n"+content);

    var newbook = new book();
    newbook.chapter = chapter;
    newbook.content = content;
    newbook.save(function (err,savebook) {
        if(err)
        {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    });
});

module.exports = dbs;