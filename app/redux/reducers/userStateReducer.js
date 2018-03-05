import constant from '../actions/constants';

const iniState = {
  userState: {
    username: "guest",
    email: "",
    records: undefined
  }
};

const changeUserState = (state = iniState, action) => {
  switch (action.type) {
    case constant.logInUser:
      return Object.assign({}, state, {
        username: action.param.username,
        email: action.param.email
      });
    case constant.saveUserRecord:
      return Object.assign({}, state, {
        records: action.value
      });
    default:
      return state;
  }
};

export default changeUserState;