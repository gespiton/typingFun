require("../css/main.sass");
require('../css/0-tools/bootstrap/js/bootstrap');
require.context('../images');

const login = require('./navBar/loginPanel');
$(document).ready(
    function () {
        if ($('#typingPage').length > 0) {
            require('./typingPage/main.js')
        }
        setTimeout(login.getLogState, 10);
    }

);
