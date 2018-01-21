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
    this.state = {email: "", password: ""};
    this.logInUser = props.logInUser;
  }

  componentDidMount() {
    // particle();
  }

  handleSubmit(e) {
    const that = this;
    e.preventDefault();
    $.post('/login',
        {
          email: this.state.email,
          password: this.state.password
        },
        function (res) {
          if (res.logged === true) {
            toastr.info('welcome, ' + res.username);
            console.log(res);
            that.logInUser({
              username: res.username,
              email: res.email
            });
            that.props.history.push('/');
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
                  <input name="password" type="text" value={this.state.password} onChange={this.handleInput}
                         className="validate"/>
                  <label htmlFor="password">password</label>
                </div>

                <div className="input-field col m6 offset-m3">
                  <input className="btn " type="submit" value="login"/>
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
