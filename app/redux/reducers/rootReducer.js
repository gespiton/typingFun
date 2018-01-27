import { combineReducers } from 'redux';
import typeResult from './saveTypeResultReducer';
import stageState from './stageStateReducer';
import userState from './userStateReducer';
import currentArticle from "./currentArticleReducer";
/*
store structure
{
  typeResult: {
    keyStrokes:[
      {
        pressedKey: 'a',
        expected: 'A',
        currentTime: time,
        cursorPos: 33
      }
    ],
    correct: 40,
    intotal: 44,
    timeSpent: 33,
    wpf: 34
  }

  stageState:{
    showChart: true
  }

  userState:{
    username: "me",
    email: "hoho"
  }

  currentArticle:{
    name: "default",
    id: "324211234988478"
  }
}
*/

const typingApp = combineReducers({
  typeResult, stageState, userState, currentArticle
});

export default typingApp;