// This is the default layout of our app
import React, {Component} from "react";
import {Link, Route} from "react-router-dom";
import HomePage from "./home/HomePage";
import TypingPage from "./typing/Main";
import SignPage from "./sign/Main";
import UserState from "./sign/UserState";

const Header = () => (
    <div>
      <header className="myHeader">
        <nav className="">
          <li className="left"><Link to="/">Home</Link></li>
          <li className="left"><Link to="/typing">typing</Link></li>
          <UserState/>
        </nav>
      </header>
      <div className="headerHolder"/>
    </div>
);

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
            <Route path="/login" component={SignPage}/>
          </switch>
        </div>
    );
  }
}

export default App;
