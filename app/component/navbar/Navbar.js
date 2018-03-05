import UserState from "./UserState";
import React from "react";
import {Link} from "react-router-dom";


const Header = () => (
    <div>
      <header className="myHeader">
        <nav className="">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/typing">typing</Link></li>
          <li className="spacer"/>

          <UserState/>
        </nav>
      </header>
      <div className="headerHolder"/>
    </div>
);

export default Header;