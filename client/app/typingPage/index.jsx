import "../../css/main.sass";
import "../../css/0-tools/bootstrap/js/bootstrap";
import React from "react";
import {render} from "react-dom";
require.context('../../images');

class App extends React.Component {
  render() {
    return <h1> Hello React!</h1>;
  }
}

render(<App/>, document.getElementById('app'));