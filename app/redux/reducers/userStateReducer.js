import constant from '../actions/constants';

const iniState = {
  userState: {
    username: "",
    email: ""
  }
};

const changeUserState = (state = iniState, action) => {
  switch (action.type) {
    case constant.logInUser:
      return Object.assign({}, iniState, {
        username: action.param.username,
        email: action.param.email
      });
    default:
      return state;
  }
};

export default changeUserState;