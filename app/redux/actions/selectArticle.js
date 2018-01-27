import constants from "./constants";
export default function (article) {
    return {
        type: constants.selectArticle,
        param: {
            name: article.name,
            id: article.id
        }
    };
}