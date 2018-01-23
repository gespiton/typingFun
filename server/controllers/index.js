const express = require('express');
const membership = require('../service/membershipService');
const path = require('path');
const router = express.Router();
const home = require('./home');
const addArticle = require('./addArticle');
const gamePage = require('./gamePage');
const passport = require('passport');
const record = require('./recordManage');

const loginController = require('./loginController');
const typingController = require('./typingController');
const articleController = require("./articleController");
// function addRoute(controller, urlBase) {
//   controller.actionList.forEach(c => {
//     router[c.action](urlBase + c.url, c.func);
//   });
// }
//
//
// addRoute(typing, '/typing');
// addRoute(home, '/');
// sign(router);
// addRoute(addArticle, '/dbs');
// addRoute(gamePage, '/game');
// addRoute(record, '/record');


router.post('/typingRecord', record);

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
