import "../css/main.sass";
import "../css/0-tools/bootstrap/js/bootstrap";
import login from "./navBar/loginPanel";
import addArticle from "./addArticlePage/addArticle";
import gamePage from "./gamePage/main";
require.context('../images');
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