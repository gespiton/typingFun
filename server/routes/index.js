const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.url);
    res.render('index', {title: 'TypingFun'});
});

module.exports = router;
