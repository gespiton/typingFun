/**
 * Created by sher on 9/5/2017.
 */
import "./particles";
import "./bgParticle";
import typing from "./typingScript";
import Draw from "./graph";
import "../../../node_modules/bootstrap-treeview/dist/bootstrap-treeview.min.css";
import "../library/bootstrap-treeview";
require('./statsConfig');

typing.start();

wireStaticsWindowEvent();

$.get('/typing/getArticleData', function buildupTreeView(result) {
  const $tree = $('#tree');
  $tree.treeview({data: result});
  $tree.treeview('collapseAll', {silent: true});
  $tree.on('nodeSelected', function reloadText(event, data) {
    if (data.href) {
      fetchText_reload(data.href);
      $('#selector-wraper').toggleClass('active');
    }
  });


  function fetchText_reload(href) {
    $.post('/typing/getArticle', {id: href}, function updateStage(result, state) {
      typing.reload(result);
    })
  }
});

function wireStaticsWindowEvent() {
  const $modal = $('#statics-window');
  const $statics = $('#statics');

  $statics.find('button').on('click', function () {
    $modal.modal('show');
  });

  $modal.on('shown.bs.modal', function () {
    Draw.draw(typing.getSpeedArr(), typing.text.split(' '));
  });

  $('#selector-toggler').on('click', function () {
    $('#selector-wraper').toggleClass('active');
  });
}