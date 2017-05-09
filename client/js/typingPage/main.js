/**
 * Created by sher on 9/5/2017.
 */
require('./particles');
require('./bgParticle')();
require('./statsConfig');
require('./typingScript');
require('./powerMode')();
require('./particles');
draw = require('./graph');

const $modal = $('#statics-window');
draw();
$('#statics').find('button').on('click', function () {
    $modal.modal('show');
});

