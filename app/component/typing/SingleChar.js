import React from "react";
import typeIn from "../../redux/actions/typeIn";
import {connect} from "react-redux";

class SingleChar extends React.Component {
  constructor(props) {
    super(props);
    props.registerMe(props.pos, this);
    this.state = props;
    this.keyPressed = this.keyPressed.bind(this);
  }

  render() {
    const classNames = `char ${this.state.typeResult || ''} ${(this.state.classNames || []).join(' ')}`;
    return (
        <span className={classNames}>
        {this.state.char}
      </span>
    );
  }

  keyPressed(key) {
    const isCorrect = key === this.state.char;
    //todo put function in state, is it best practice?
    // this.state.saveTypeResult({
    //   pressedKey: key,
    //   expected: this.state.char,
    //   currentTime: new Date().getTime(),
    //   cursorPos: this.state.pos
    // });

    if (isCorrect) {
      this.correctKey();
      return true;
    } else {
      this.wrongKey();
    }
  }

  correctKey() {
    this.setState(() => {
      return {typeResult: ' correct '};
    });
  }

  wrongKey() {
    this.setState(() => {
      return {typeResult: ' incorrect '};
    });
  }

}


export default SingleChar;
