import React from "react";
import typeIn from "../../redux/actions/typeIn";
import {connect} from "react-redux";

class SingleChar extends React.Component {
  constructor(props) {
    super();
    props.registerMe(props.pos, this);
    this.state = props;
    this.keyPressed = this.keyPressed.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('child update');
    if (nextState.typeResult !== this.state.typeResult || nextState.classNames !== this.state.classNames) {
      return true;
    }
    return false;
  }

  render() {
    const classNames = `char ${this.state.typeResult || ''} ${(this.state.classNames || []).join(' ')}`;
    return (
        <span className={classNames}>
        {this.state.char}
      </span>
    );
  }

  setCurrentChar() {

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
