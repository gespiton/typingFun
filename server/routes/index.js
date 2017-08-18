const express = require('express');
const router = express.Router();
const typing = require('../controllers/typing');
const home = require('../controllers/home');
const login = require('../controllers/login');
const addArticle = require('../controllers/addArticle');
const gamePage = require('../controllers/gamePage');
const passport = require('passport');
const record = require('../controllers/recordManage');

function addRoute(controller, urlBase) {
  controller.actionList.forEach(c => {
    router[c.action](urlBase + c.url, c.func)
  });
  console.log(controller.actionList);
}


addRoute(typing, '/typing');
addRoute(home, '/');
login(router);
addRoute(addArticle, '/dbs');
addRoute(gamePage, '/game');
addRoute(record, '/record');

module.exports = router;
