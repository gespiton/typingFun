import React, {Component} from "react";
import {Link} from "react-router-dom";

class UserState extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <li className="right"><Link to="/register">register</Link></li>
          <li className="right"><Link to="/login">login</Link></li>
        </div>
    );
  }


}

export default UserState;

