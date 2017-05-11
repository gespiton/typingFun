/**
 * Created by sher on 9/5/2017.
 */
require('./particles');
require('./bgParticle')();
require('./statsConfig');
require('./powerMode')();
require('./particles');
const app = require('./typingScript');
const Draw = require('./graph');

//start typing
app.start();


const $modal = $('#statics-window');
const $statics = $('#statics');

$statics.find('button').on('click', function () {
    $modal.modal('show');
});

$modal.on('shown.bs.modal', function () {
    Draw.draw(app.getSpeedArr(), app.text.split(' '));
});
module.hot.accept();
