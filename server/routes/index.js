const express = require('express');
const membership = require('../service/membershipService');
const path = require('path');
const router = express.Router();
const typing = require('../controllers/typing');
const home = require('../controllers/home');
const login = require('../controllers/login');
const addArticle = require('../controllers/addArticle');
const gamePage = require('../controllers/gamePage');
const passport = require('passport');
const record = require('../controllers/recordManage');

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

router.post('/login', membership.login);
router.post('/register', membership.register);

router.get('*', (req, res) => {
  "use strict";
  // res.render('index.html');
  res.sendFile(path.join(__dirname, '../../app/index.html'));
});

module.exports = router;
