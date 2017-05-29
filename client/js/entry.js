import "../css/main.sass";
import "../css/0-tools/bootstrap/js/bootstrap";
import login from "./navBar/loginPanel";
require.context('../images');
$(document).ready(
    function () {
        if ($('#typingPage').length > 0) {
            require('./typingPage/main.js')
        }
        setTimeout(login.getLogState, 10);
    }
);