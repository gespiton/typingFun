import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import toastr from "toastr";
import PropTypes from 'prop-types';
import logIn from "../../redux/actions/logInUser";


class UserState extends Component {

  static propTypes = {
    logInUser: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.userState, {hide: true});
    this.logInUser = props.logInUser;
    this.initUserState();
    this.bindDropDown = (elem) => this.dropDown = elem;
    this.toggleDropdown = this.toggleDropdown.bind(this);
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


  toggleDropdown() {
    this.setState({hide: !this.state.hide});
  }


  render() {
    const user = this.props.userState;
    const hide = this.state.hide;

    if (user.email) {
      return (
          <li className="user-panel" onClick={this.toggleDropdown}>
            <i className="fa fa-user-o fa-2x"/>
            <div className={hide ? "folded" : ""} id="dropdown" ref={this.bindDropDown}>
              <li className="my-collection-item"><a href="/logout">log out</a></li>
            </div>
          </li>
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

