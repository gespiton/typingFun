import React, {Component} from "react";
import {Route} from "react-router-dom";
import HomePage from "./home/Main";
import TypingPage from "./typing/Main";
import LoginPage from "./sign/Login";
import RegisterPage from "./sign/Register";
import Header from './navbar/Navbar';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          {Header()}
          <switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/typing" component={TypingPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={RegisterPage}/>
          </switch>
        </div>
    );
  }
}

export default App;
