import constant from '../actions/constants';


const iniState = {
  keyStrokes: [],
  incorrect: 0,
  total: 0,
  timeSpent: 0,
  wpf: 0
};

const saveTypeResult = (state = iniState, action) => {
      const typeResult = action.typeResult;
      switch (action.type) {
        case constant.typeResult: {
          const newState = Object.assign({}, state);
          newState.keyStrokes.push(typeResult);
          const incorrect = typeResult.expected !== typeResult.pressedKey;

          if (incorrect) {
            newState.incorrect += 1;
          }
          newState.total += 1;
          // debugger;
          const startedTime = state.keyStrokes[0].currentTime;
          const elapsed = Math.floor((typeResult.currentTime - startedTime) / 100) / 10;
          let wpf = Math.floor((newState.total / 5 - newState.incorrect) / (elapsed / 60));
          console.log('new wpf is: ', wpf);
          newState.wpf = wpf > 0 ? wpf : 0;
          newState.timeSpent = elapsed;
          return newState;
        }
        default: {
          return state;
        }
      }
    }
;


export default saveTypeResult;