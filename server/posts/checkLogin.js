/**
 * Created by liliz on 2017/2/14.
 */
var session = require('express-session');
var checkLogin = function(){
    if(session.user == 0){
        console.log('please login first');
    }
    else
        console.log(session);
};

module.exports = checkLogin;