var express = require('express');
var router = express.Router();
var User = require('../../routes/User');
var path = require('path');
var http = require('http');
var session = require('express-session');

router.post('/', function (req, res, next) {
    var username = req.body.login_username;
    var password = req.body.login_password;
    console.log(username + ':'+password);
    var newuser = new User();
    User.findOne({username: username, password: password}, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            user.update(function (err, updatelogin) {
                if (err)
                    console.log(err);
                else {
                    session.user = username;
                }
            });
        }
        //为了方便测试，这里设置如果用户不存在，则在数据库中添加用户，以后会设计register页面
        else if (!user) {
            newuser.username = username;
            newuser.password = password;
            newuser.save(function (err, saveuser) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
});

module.exports = router;
