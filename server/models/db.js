/**
 * Created by liliz on 2017/2/1.
 */

//visit by /dbs,you can add chapters to database
const express = require('express');
const book = require('./article.js');
const dbs = express.Router();

dbs.get('/', function (req, res) {
    res.render('CustomArticle.jade');
});

dbs.post('/', function (req, res) {
    console.log(req.body);
    let title = req.body.title;
    let content = req.body.content;
    let newbook = new book();
    newbook.chapter = chapter;
    newbook.content = content;
    newbook.save(function (err, savebook) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    });
    res.send(title + "\n" + content);
});

module.exports = dbs;