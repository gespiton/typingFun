import React, { Component } from "react";
import ReactDOM from "react-dom";
import SingleChar from "./SingleChar";
import Cursor from "./Cursor";
import PowerMode from "./lib/powerMode";
import InfoBoard from "./InfoBoard";
import { connect } from "react-redux";
import typeIn from "../../redux/actions/typeIn";
import toastr from 'toastr';
import DataVisualizer from './TypingDataVisualize';
import { toggleChart } from "../../redux/actions/stageStatus";
import PropTypes from 'prop-types';
import { debug } from "util";


class Stage extends Component {

  static propTypes = {
    typeResult: PropTypes.object.isRequired,
    saveTypeResult: PropTypes.func.isRequired,
    toggleChart: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { 'complete': false, 'article': {} };
    this.curPos = 0;
    // this.text = text2;
    this.childrenTable = {};

    this.keyPressed = this.keyPressed.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  componentDidMount() {
    this.loadDefaultArticle();
    this.powerMode = new PowerMode();
    this.powerMode.draw();
    window.addEventListener('scroll', () => this.scroll());
  }

  shouldComponentUpdate(nextprox, nextState) {
    return false;
  }

  loadDefaultArticle() {
    const that = this;
    $.get('/article', function (res) {
      that.setState({ article: res.article });
      that.genTextArr();
      that.genChildren();
      that.forceUpdate();
      that.moveCursor({ dir: 0 });
      that.focusStage();
    });
  }


  focusStage() {
    this.stage.focus();
  }

  genTextArr() {
    //todo think of better way
    console.log(this.state.article.sub[0].text);
    
    this.textArr = this.state.article.sub[0].text.split('');
  }

  genChildren() {
    const props = {
      registerMe: this.registerChild.bind(this)
    };

    this.Children = this.textArr.map(
      (char, index) => (
        <SingleChar key={index} char={char} pos={index} {...props} />
      )
    );
  }

  registerChild(pos, child) {
    this.childrenTable[pos] = child;
    if (!this.childrenTable.length || this.childrenTable.length < pos) {
      this.childrenTable.length = pos + 1;
    }
  }

  keyPressed(e) {
    if (this.state.complete) return;
    e.preventDefault();

    const pressed = String.fromCharCode(e.charCode);

    this.props.saveTypeResult({
      pressedKey: pressed,
      expected: this.textArr[this.curPos],
      currentTime: new Date().getTime(),
      cursorPos: this.curPos
    });

    const isCorrect = this.childrenTable[this.curPos].keyPressed(pressed);
    if (isCorrect) {
      this.powerMode.spawnParticles(this.getCurrentTransform());
    }


    if (this.curPos < this.childrenTable.length - 1) {
      this.moveCursor({ dir: 1 });
    } else {
      this.setState(() => ({ 'complete': true }));
      this.complete();
    }

    this.curPos += 1;
    return false;
  }

  keyDown(e) {
    if (this.state.complete) return;
    if (this.curPos === 0) return false;

    const backSpaceKeyCode = 8;
    if (e.keyCode === backSpaceKeyCode) {
      this.moveCursor({ dir: -1, isBack: true });
      this.curPos -= 1;
      return false;
    }
    return true;
  }

  getCurrentTransform() {
    const rect = ReactDOM.findDOMNode(this.childrenTable[this.curPos]).getBoundingClientRect();
    return { X: rect.x, Y: rect.y };
  }


  moveCursor(args) {
    const props = this.getCurrentCharRect(args.dir);

    this.cursor.setState(() => {
      return { styles: props };
    });

    if (args.isBack) {
      this.childrenTable[this.curPos].setState(() => ({ classNames: [], typeResult: '' }));
    } else {
      this.childrenTable[this.curPos].setState(() => ({ classNames: [] }));
    }

    const nextChar = this.childrenTable[this.curPos + args.dir];
    nextChar.setState(prestate => {
      return { classNames: ['curChar', ...(prestate.classNames || [])] };
    });
  }

  getCurrentCharRect(offset = 0) {
    const boundingRect = (ReactDOM.findDOMNode(this.childrenTable[this.curPos + offset]).getBoundingClientRect());
    return {
      left: boundingRect.left,
      top: boundingRect.top,
      height: boundingRect.height,
      width: boundingRect.width
    };
  }


  complete() {
    toastr.info('type complete');
    console.log(this.props.typeResult);
    const typeResult = this.props.typeResult;
    typeResult.article = this.state.article;

    $.post('/typing/complete', typeResult, function success(msg) {
      console.log(msg);
    });

    this.props.toggleChart(true);
  }

  scroll() {
    this.moveCursor({ dir: 0 });
  }

  render() {
    return (
      <div
        className="typing main"
        tabIndex="0"
        onKeyPress={this.keyPressed}
        onKeyDown={this.keyDown}
        ref={elem => this.stage = elem}
      >
        <InfoBoard>
          children
          </InfoBoard>
        <div
          id="stage-wrap"
          className="col-md-10 col-md-offset-1"
        >
          <canvas id="canvas" className="col-md-10" />
          <div
            id="stage"
          >
            {this.Children}
            <Cursor ref={elem => this.cursor = elem} />
          </div>
        </div>
        <DataVisualizer
          ref={elem => {
            this.visualizer = elem;
          }}
        />
      </div>
    );
  }
}


Stage.contextTypes = { store: PropTypes.object };

const mapStateToProps = state =>
  ({ typeResult: state.typeResult });

const mapDispatchToProps = (dispatch) => {
  return {
    saveTypeResult: res => {
      dispatch(typeIn(res));
    },
    toggleChart: showIt => {
      dispatch(toggleChart(showIt));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stage);