const express = require('express');
const path = require('path');
const loginController = require('./loginController');
const typingController = require('./recordController');
const articleController = require("./articleController");



const router = express.Router();

loginController(router);
typingController(router);
articleController(router);

// default
router.get('*', (req, res) => {
  "use strict";
  // res.render('index.html');
  res.sendFile(path.join(__dirname, '../../app/index.html'));
});

module.exports = router;
