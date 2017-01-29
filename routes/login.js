var express = require('express');
var router = express.Router();
var formidable = require("express-formidable");
var util = require("util");
var http = require('http');
var form = require('formidable');

router.post('/', function (req, res, next) {
    console.log('i am in');
    tryToSignIn(req, res);
});

function tryToSignIn(req, res) {
    console.log('trying to sign in');
    console.log(req.body);

    // res.end();
    // res.json({ user: 'tobi' });
    res.redirect('/');
}
module.exports = router;
