var express = require('express');
var router = express.Router();
var http = require('http');
var User = require('./User');

router.post('/', function (req, res, next) {
    var username = req.body.login_username;
    var password = req.body.login_password;
    var newuser = new User();
    User.findOne({username:username,password:password},function(err,user){
        if(err)
        {
            console.log(err);
        }
        if(user)
        {
            res.end("login success");
            user.login = true;
            user.update(function(err,updatelogin){
                if(err)
                    console.log(err);
            });
        }
        else if(!user)
        {
            newuser.username = username;
            newuser.password = password;
            newuser.save(function (err,saveuser) {
                if(err)
                {
                    console.log(err);
                }
            });
            res.end("username or password wrong");
        }
    });
});

module.exports = router;
