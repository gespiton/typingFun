import React from "react";
import {Link} from "react-router-dom";

class HomePage extends React.Component {
  render() {
    return (
        <div className="home">
          <h1>home page</h1>
          <Link to="typing"> typing</Link>
        </div>
    );
  }
}

export default HomePage;