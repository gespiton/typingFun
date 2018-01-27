const Dao = require("./lib/articleDao");

const dao = new Dao();

module.exports = ({

    /**
     * saves a article
     * {
     *      name:***,
     *      text:***,
     *      sub:[
     *          ***
     *      ]
     * }
     */
    saveArticle: function (article) {
        return dao.saveArticle(article);
    },

    /*
        get article by name
    */
    findArticleByName: function (name) {
        return dao.findArticleByName(name);
    },

    /**
     * get article by article id
     * return article
     */

    findArticleById: function (id) {
        return dao.findArticleById(id);
    },

    /*
    get article index 
        {
            id:***
            name:***
            charNum:***
            sub:[
                {
                    id:***
                    name:***
                    charNum:***
                }
            ]
        }
    */
    getArticleIndex: function () {
        return dao.getArticleIndex();
    }
});