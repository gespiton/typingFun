// This is the default layout of our app
import React from "react";
import {Link, Route} from "react-router-dom";
import HomePage from "./home/HomePage";
import TypingPage from "./typing/Main";

const Header = () => (
    <div>
      <header className="myHeader">
        <nav className="navbar navbar-default navbar-fixed-top">
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/typing">typing</Link></li>
          </ul>
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
