var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
    res.end('login logic');
});

module.exports = router;
