jQuery = $ = require('./library/jquery');
require("../css/main.sass");
require('./library/bootstrap');
// require('../images/loged.png');  // todo why the hell don't I need it now
// require('../images/login.png');
const typeScript = require('./typingPage/typingScript');
const powermode = require('./typingPage/powerMode');
const login = require('./navBar/loginPanel');
require('./typingPage/particles');
const bg = require('./typingPage/bgParticle');
$(document).ready(
    function () {
        bg();
        typeScript();
        powermode();
        setTimeout(login.getLogState, 10);
    }
);

module.hot.accept();