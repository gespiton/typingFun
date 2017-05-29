/**
 * Created by sher on 27/5/2017.
 */

const User = require('../models/User.js');
const session = require('express-session');
function login(req, res, next) {


    let username = req.body.login_username;
    let password = req.body.login_password;
    console.log(username + ':' + password);

    User.findOne({username: username, password: password}, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            req.session.user = username;
            req.session.view = 1;
            res.json({loged: true});
        }
        //为了方便测试，这里设置如果用户不存在，则在数据库中添加用户，以后会设计register页面
        else {
            res.json({loged: false});
        }
    });
}

function verify(req, res) {
    if (req.session.view) {
        req.session.view++;
        console.log(req.session.view + ' time visit');
        console.log('current user is ' + req.session.user);
        return res.json({loged: true, username: req.session.user});
    } else
        return res.json({loged: false});
}

function register(req, res) {
    console.log('registering');
    const userName = req.body.rg_username;
    User.findOne({username: userName}, function (err, user) {
        if (err) {
            console.log(err);
            res.json({success: false, msg: 'db failed'});
        }

        if (user) {
            res.json({success: false, msg: 'user already exist'});
        } else {
            const passwd = req.body.rg_password;
            const email = req.body.rg_email;
            let newUser = new User();
            newUser.username = userName;
            newUser.password = passwd;
            newUser.email = email;
            try {
                newUser.save(function (err, saveuser) {
                    if (err) {
                        console.log(err);
                        res.json({success: false, msg: 'db save error'});
                    }
                    res.json({success: true});
                });
            } catch (e) {
                console.log(e)
            }
        }
    });


}

module.exports = {
    actionList: [
        {action: 'post', url: '/', func: login},
        {action: 'post', url: '/verify', func: verify},
        {action: 'post', url: '/register', func: register}
    ]
};
