import UserState from "./UserState";
import React from "react";
import {Link} from "react-router-dom";


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

export default Header;