/**
 * Created by sher on 9/5/2017.
 */
require('./particles');
require('./bgParticle')();
// require('./statsConfig');
require('./powerMode')();
require('./particles');
const app = require('./typingScript');
const Draw = require('./graph');
require('../../../node_modules/bootstrap-treeview/dist/bootstrap-treeview.min.css');
require('../library/bootstrap-treeview');
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

$('#selector-toggler').on('click', function () {
    $('#selector-wraper').toggleClass('active');
});


function loadArticle(href) {
    $.post('/typing/getArticle', {id: href}, function (result,state) {
        app.reload(result);
    })
}
$.get('/typing/getArticleData', function (result) {
    const $tree = $('#tree');
    $tree.treeview({data: result});
    $tree.treeview('collapseAll', {silent: true});
    $tree.on('nodeSelected', function (event, data) {
        if (data.href) {
            loadArticle(data.href);
            $('#selector-wraper').toggleClass('active');
        }
    });
});



