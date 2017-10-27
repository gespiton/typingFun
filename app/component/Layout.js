// This is the default layout of our app
import React from "react";
import {Link, Route} from "react-router-dom";
import HomePage from "./home/HomePage";
import TypingPage from "./typing/Main";

const Header = () => (
    <div>
      <header className="myHeader">
        <nav className="navbar navbar-default navbar-fixed-top">
          <li className="left"><Link to="/">Home</Link></li>
          <li className="left"><Link to="/typing">typing</Link></li>
          <li className="right"><Link to="/register">register</Link></li>
          <li className="right"><Link to="/login">login</Link></li>

        </nav>
      </header>
      <div className="headerHolder"/>
    </div>
);

class App extends React.Component {
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
          </switch>
        </div>
    );
  }
}

export default App;
