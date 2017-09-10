import constant from '../actions/constants';

const iniState = {
  showChart: false
};

const changeStageState = (state = iniState, action) => {
  switch (action.type) {
    case constant.showChart:
      return Object.assign({}, iniState, {showChart: action.showChart});
    default:
      return state;
  }
};

export default changeStageState;