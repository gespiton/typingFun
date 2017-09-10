import "../css/main.sass";
import "../css/0-tools/bootstrap/js/bootstrap";
require.context('../images');
import addArticle from "./addArticlePage/addArticle";
import gamePage from "./gamePage/main";
$(document).ready(
  function () {
    const $curPage = $('body').attr('id');

    if ($curPage === 'typingPage') {
      require('./typingPage/main.js')
    }

    if ($curPage === 'addArticle') {
      addArticle();
    }
    if ($curPage === 'gamePage') {
      gamePage();
    }
  }
);