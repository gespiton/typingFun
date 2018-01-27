import constants from "../actions/constants";

const iniState = {
    name: 'default',
    id: ''
};

const selectArticle = (state = iniState, action) => {
    const article = action.param;
    switch (action.type) {

        case constants.selectArticle: {
            return article;
        }

        default:
            return state;
    }
};

export default selectArticle;