/**
 * Created by liliz on 2017/2/14.
 */
const session = require('express-session');
const checkLogin = function () {
    if (session.user == 0) {
        console.log('please login first');
    }
    else
        console.log(session);
};

module.exports = checkLogin;