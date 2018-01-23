/**
 * Created by liliz on 2017/2/1.
 */
//visit by /dbs,you can add chapters to database
const express = require('express');
const fs = require('fs');
// const book = require('../models/article.js');

function main(req, res) {
    res.render('CustomArticle.pug', {title: "add", page: "addArticle"});
}

function add(req, res) {
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
}

module.exports = {
    actionList: [
        {action: 'get', url: '/', func: main},
        {action: 'post', url: '/add', func: add}
    ]
};