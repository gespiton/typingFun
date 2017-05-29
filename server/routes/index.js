const express = require('express');
const router = express.Router();
const typing = require('../controllers/typing');
const home = require('../controllers/home');
const login = require('../controllers/login');
const addArticle = require('../controllers/add');

function addRoute(controller, urlBase) {
    controller.actionList.forEach(c => {
        router[c.action](urlBase + c.url, c.func)
    });
    console.log(controller.actionList);
}


addRoute(typing, '/typing');
addRoute(home, '/');
addRoute(login, '/login');
addRoute(addArticle,'/dbs');

module.exports = router;
