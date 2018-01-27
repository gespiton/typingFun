import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import toastr from "toastr";
import PropTypes from 'prop-types';
import logIn from "../../redux/actions/logInUser";


class UserState extends Component {

  static propType = {
    logInUser: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.userState);
    this.logInUser = props.logInUser;
    this.initUserState();
  }

  initUserState() {
    const that = this;
    $.get('/me',
        function (res) {
          if (res.email) {
            that.logInUser({
              username: res.username,
              email: res.email
            });
          }
        });
  }


  render() {
    const user = this.props.userState;
    if (user.email) {
      return (
          <div>
            <li className="right label">{user.username}</li>
          </div>
      );
    } else {
      return (
          <div>
            <li className="right"><Link to="/register">register</Link></li>
            <li className="right"><Link to="/login">login</Link></li>
          </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    userState: state.userState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: user => {
      dispatch(logIn(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserState);

