import React, {Component} from "react";
import {connect} from "react-redux";
import logIn from "../../redux/actions/logInUser";
import toastr from 'toastr';
import {withRouter} from 'react-router';


// import particle from './lib/bgParticle';

class Sign extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.state = {email: "", password: "", username: "", confirm: ""};
    this.logInUser = props.logInUser;
  }

  componentDidMount() {
    //todo particle();
  }

  handleSubmit(e) {
    const that = this;
    e.preventDefault();
    $.post('/register',
        {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          confirm: this.state.confirm
        },
        function (res) {
          console.log(res);
          if (res.success) {
            toastr.success("register success, please log in");
            that.props.history.push('/login');
          } else {
            toastr.error(res.message);
          }
        });
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  render() {
    return (
        <div id="main">
          <div id="particles-js"/>
          <div className="row">
            <form method="post" className="col m12 l12" onSubmit={this.handleSubmit}>
              <div className="row">

                <div className="input-field col m6 offset-m3">
                  <input name="email" type="text" value={this.state.email} onChange={this.handleInput}
                         className="validate"/>
                  <label htmlFor="email">email</label>
                </div>

                <div className="input-field col m6 offset-m3">
                  <input name="username" type="text" value={this.state.username} onChange={this.handleInput}
                         className="validate"/>
                  <label htmlFor="username">username</label>
                </div>

                <div className="input-field col m6 offset-m3">
                  <input name="password" type="text" value={this.state.password} onChange={this.handleInput}
                         className="validate"/>
                  <label htmlFor="password">password</label>
                </div>

                <div className="input-field col m6 offset-m3">
                  <input name="confirm" type="text" value={this.state.confirm} onChange={this.handleInput}
                         className="validate"/>
                  <label htmlFor="confirm">confirm</label>
                </div>

                <div className="input-field col m6 offset-m3">
                  <input className="btn " type="submit" value="register"/>
                </div>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: user => {
      dispatch(logIn(user));
    }
  };
};
export default withRouter(connect(null, mapDispatchToProps)(Sign));

