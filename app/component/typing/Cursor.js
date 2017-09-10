import React from "react";

class Cursor extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
        <div id="caret" style={this.state.styles}/>
    );
  }
}

export default Cursor;
