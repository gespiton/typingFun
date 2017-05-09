// jQuery = $ = require('./library/jquery');
require("../css/main.sass");
require('../css/0-tools/bootstrap/js/bootstrap');
require.context('../images');

const login = require('./navBar/loginPanel');
$(document).ready(
    function () {
        if ($('#typingPage').length > 0) {
            require('./typingPage/particles');
            const bg = require('./typingPage/bgParticle');
            bg();
            require('./typingPage/statsConfig');
            const typeScript = require('./typingPage/typingScript');
            const powermode = require('./typingPage/powerMode');
            require('./typingPage/particles');

            typeScript();
            powermode();
            const $modal = $('#statics-window');
            $('#statics').find('button').on('click', function () {
                $.modal.modal('show');
            });

            setTimeout(login.getLogState, 10);
        }
    }
);

module.hot.accept();