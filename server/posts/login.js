const express = require('express');
const router = express.Router();
const User = require('../../routes/User');
const session = require('express-session');

router.post('/', function (req, res, next) {
    if (req.body.verify) {
        if (req.session.view) {
            req.session.view++;
            console.log(req.session.view + ' time visit');
            console.log(req.session.user);
            return res.json({loged: true, username: req.session.user});
        } else
            return res.json({loged: false});
    }

    let username = req.body.login_username;
    let password = req.body.login_password;
    console.log(username + ':' + password);
    let newUser = new User();

    User.findOne({username: username, password: password}, function (err, user) {
        console.log('in');
        if (err) {
            console.log(err);
        }
        if (user) {
            user.update(function (err, updatelogin) {
                if (err)
                    console.log(err);
                else {
                    req.session.user = username;
                    req.session.view = 1;
                    console.log('after add ' + req.session.view);
                    res.json({loged: true});  // got to have some response here
                }
            });
        }
        //为了方便测试，这里设置如果用户不存在，则在数据库中添加用户，以后会设计register页面
        else if (!user) {
            newUser.username = username;
            newUser.password = password;
            newUser.save(function (err, saveuser) {
                if (err) {
                    console.log(err);
                }
            });
            res.json({loged: false});
        }
    });
});

module.exports = router;
