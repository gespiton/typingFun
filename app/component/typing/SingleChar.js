import React, {Component} from "react";

class SingleChar extends Component {
  constructor(props) {
    super(props);
    props.registerMe(props.pos, this);
    this.state = Object.assign({}, props);
    this.keyPressed = this.keyPressed.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.typeResult !== this.state.typeResult || nextState.classNames !== this.state.classNames;
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

  render() {
    const classNames = `char ${this.state.typeResult || ''} ${(this.state.classNames || []).join(' ')}`;
    return (
      <span className={classNames}>
        {this.state.char}
      </span>
    );
  }

}


export default SingleChar;
