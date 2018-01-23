const Dao = require("./lib/articleDao");

const dao = new Dao();

module.exports = ({
    saveArticle: function (article) {
        return dao.saveArticle(article);
    },

    findArticleByName: function (name) {
        return dao.findArticleByName(name);
    }
});