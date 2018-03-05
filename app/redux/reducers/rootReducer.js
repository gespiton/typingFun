import {combineReducers} from 'redux';
import typeResult from './typeResultReducer';
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
    showChart: false
  }

  userState:{
    username: "guest",
    email: "",
    records: undefined
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