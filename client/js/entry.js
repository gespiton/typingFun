import "../css/main.sass";
import "../css/0-tools/bootstrap/js/bootstrap";
import login from "./navBar/loginPanel";
import addArticle from "./addArticlePage/addArticle";
require.context('../images');
$(document).ready(
    function () {
        if ($('#typingPage').length > 0) {
            require('./typingPage/main.js')
        }

        if ($('body').attr('id') === 'addArticle') {
            addArticle();
        }
        setTimeout(login.getLogState, 10);
    }
);