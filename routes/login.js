var express = require('express');
var router = express.Router();
var util = require("util");
var http = require('http');

router.post('/', function (req, res, next) {
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
