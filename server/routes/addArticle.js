/**
 * Created by liliz on 2017/2/1.
 */
//visit by /dbs,you can add chapters to database
const express = require('express');
const fs = require('fs');
// var formidable = require('formidable');
const book = require('./../database/book.js');
const router = express.Router();
// const checkLogin = require('../server/posts/checkLogin');
router.get('/', function (req, res) {
    res.render('CustomArticle.jade');
});
router.post('/', function (req, res) {
    console.log(req.body);
    const chapter = req.body.chapter;
    const content = req.body.content;
    res.send(chapter + "\n" + content);

    const newbook = new book();
    newbook.chapter = chapter;
    newbook.content = content;
    newbook.save(function (err, savebook) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    });
});

module.exports = router;