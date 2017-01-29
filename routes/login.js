var express = require('express');
var router = express.Router();
var User = require('./User');
var path = require('path');

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
            user.login = true;
            user.update(function (err, updatelogin) {
                if (err)
                    console.log(err);
            });

            res.json({'loged': true});
        }
        else if (!user) {
            newuser.username = username;
            newuser.password = password;
            newuser.save(function (err, saveuser) {
                if (err) {
                    console.log(err);
                }
            });
            res.json({'loged': false});
        }
    });
});

module.exports = router;
