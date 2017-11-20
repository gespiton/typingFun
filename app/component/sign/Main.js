import React, {Component} from "react";

// import particle from './lib/bgParticle';

class Sign extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // particle();
  }

  render() {
    return (
        <div id="main">
          <div id="particles-js"/>
          <div className="row">
            <form method="post" className="col m12 l12">
              <div className="row">
                <div className="input-field col m6 offset-m3">
                  <input id="user-name" type="text" className="validate"/>
                  <label htmlFor="user-name">user name</label>
                </div>
                <div className="input-field col m6 offset-m3">
                  <input id="password" type="text" className="validate"/>
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

export default Sign;

