import constant from './constants';

function logInUser(user) {
  return {
    type: constant.logInUser,
    param: user
  };
}

export default logInUser;