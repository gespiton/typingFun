import React, {Component} from "react";
import ReactDOM from "react-dom";
import SingleChar from "./SingleChar";
import Cursor from "./Cursor";
import PowerMode from "./lib/powerMode";
import InfoBoard from "./InfoBoard";
import {connect} from "react-redux";
import typeIn from "../../redux/actions/typeIn";
import toastr from 'toastr';
import DataVisualizer from './TypingDataVisualize';
import {toggleChart} from "../../redux/actions/stageStatus";
import PropTypes from 'prop-types';

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

const text = `Once when I was six I saw a magnificent picture in a book about the jungle, called True Stories. It showed a boa constrictor swallowing a wild beast. Here is a copy of the picture.
  My drawing was not a picture of a hat. It was a picture of a boa constrictor digesting an elephant. Then I drew the inside of the boa constrictor, so the grown-ups could understand. They always need explanations.
  Whenever I encountered a grown-up who seemed to be intelligent, I would experiment on him with my drawing Number One, which I have always kept. I wanted to see if he really understood anything.
  But he would alwak it said: "Boa constrictors swallow their prey whole, without chewing. Afterward they are no longer able to move, and they sleep for six months they need for digestion."
  I showed the grown-ups my masterpiece, and I asked them if my drawing scared them.
  My drawing was not a picture of a hat. It was a picture of a boa constrictor digesting an elephant. Then I drew the inside of the boa constrictor, so the grown-ups could understand. They always need explanations.
  Whenever I encountered a grown-up who seemed to be intelligent, I would experiment on him with my drawing Number One, which I have always kept. I wanted to see if he really understood anything.
  But he would always answer, "That's a hat." Then I wouldn't talk about boa constrictors or jungles or stars. I would put myself on his level and talk about bridge and golf and politics and neckties. And my grown-up was glad to know such a reasonable person.`;
const text2 = "tthis is not good tthis is not goodtthis is ";


class Stage extends Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.curPos = 0;
    this.text = text2;
    this.childrenTable = {};
    this.genTextArr();
    this.genChildren();
    this.keyPressed = this.keyPressed.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  componentDidMount() {
    this.moveCursor({dir: 0});
    this.focusStage();
    this.powerMode = new PowerMode();
    this.powerMode.draw();
  }

  shouldComponentUpdate(nextprox, nextState) {
    console.log("props", this.props);
    console.log("state", this.staet);
    console.log('one', nextprox);
    console.log('two', nextState);
    return false;
  }

  componentWillUpdate() {
    console.log("updating");
  }

  componentDidUpdate() {
    console.log("wtf");
  }

  focusStage() {
    this.stage.focus();
  }

  genTextArr() {
    this.textArr = this.text.split('');
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
    e.preventDefault();
    if (this.curPos >= this.childrenTable.length) {
      //todo dewire event, trigger complete event
      return;
    }
    const pressed = String.fromCharCode(e.charCode);

    this.state.saveTypeResult({
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
      this.moveCursor({dir: 1});
    } else {
      this.complete();
    }

    this.curPos += 1;
    return false;
  }

  keyDown(e) {
    if (this.curPos === 0) return false;

    const backSpaceKeyCode = 8;
    if (e.keyCode === backSpaceKeyCode) {
      this.moveCursor({dir: -1, isBack: true});
      this.curPos -= 1;
      return false;
    }
    return true;
  }

  getCurrentTransform() {
    const rect = ReactDOM.findDOMNode(this.childrenTable[this.curPos]).getBoundingClientRect();
    return {X: rect.x, Y: rect.y};
  }

  moveCursor(args) {
    const nextChar = this.childrenTable[this.curPos + args.dir];
    const nextDom = (ReactDOM.findDOMNode(nextChar).getBoundingClientRect());

    const props = {
      left: nextDom.left,
      top: nextDom.top,
      height: nextDom.height,
      width: nextDom.width
    };

    this.cursor.setState(() => {
      return {styles: props};
    });

    if (args.isBack) {
      this.childrenTable[this.curPos].setState(() => ({classNames: [], typeResult: ''}));
    } else {
      this.childrenTable[this.curPos].setState(() => ({classNames: []}));
    }
    nextChar.setState(prestate => {
      return {classNames: ['curChar', ...(prestate.classNames || [])]};
    });
  }


  complete() {
    toastr.info('type complete');
    this.state.toggleChart(true);
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
            <canvas id="canvas" className="col-md-10"/>
            <div
                id="stage"
            >
              {this.Children}
              <Cursor ref={elem => this.cursor = elem}/>
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


Stage.contextTypes = {store: PropTypes.object};

const mapStateToProps = state => {
  return {typeResult: state.typeResult};
};

const mapDispatchToProps = (dispatch, ownProps) => {
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