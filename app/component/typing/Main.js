import React from "react";
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

	In the book it said: "Boa constrictors swallow their prey whole, without chewing. Afterward they are no longer able to move, and they sleep for six months they need for digestion."
	In those days I thought a lot about jungle adventures, and eventually managed to make my first drawing, with a colored pencil. My drawing Number One looked like this:
	I showed the grown-ups my masterpiece, and I asked them if my drawing scared them.
	They answered, "Why should anyone be scared of a hat?"
	My drawing was not a picture of a hat. It was a picture of a boa constrictor digesting an elephant. Then I drew the inside of the boa constrictor, so the grown-ups could understand. They always need explanations.
	My drawing Number Two looked like this:
	The grown-ups advised me to put away my drawings of boa constrictors, outside or inside, and apply myself instead to geography, history, arithmetic, and grammar. That is why I gave up, at the age of six, a magnificent career as an artist. I had been discouraged by the failure of my drawing Number One and of my drawing Number Two.
	Grown-ups never understand anything by themselves, and it is exhausting for children to have to explain over and over again.
	So then I had to choose another career. I learned to pilot airplanes. I have flown almost everywhere in the world. And, as a matter of fact, geography has been a big help to me. I could tell China from Arizona at first glance, which is very useful if you get lost during the night.
	So I have met, in the course of my life, lots of serious people. I have spent lots of time with grownups. I have seen them at close range... which hasn't improved my opinion of them.
	Whenever I encountered a grown-up who seemed to be intelligent, I would experiment on him with my drawing Number One, which I have always kept. I wanted to see if he really understood anything.
	But he would always answer, "That's a hat." Then I wouldn't talk about boa constrictors or jungles or stars. I would put myself on his level and talk about bridge and golf and politics and neckties. And my grown-up was glad to know such a reasonable person.`;
const text2 = "tthis is not good";

//todo toaster for notification

class Stage extends React.Component {
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

  render() {
    return (
        <div
            className="typing main container"
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
          <DataVisualizer ref={elem => {
            console.log(elem);
            this.visualizer = elem;
          }}/>
        </div>
    );
  }

  focusStage() {
    this.stage.focus();
  }

  componentDidMount() {
    console.log('mounted');
    const rect = (ReactDOM.findDOMNode(this.cursor)).getBoundingClientRect();
    this.cursorOriPos = {
      left: rect.left,
      top: rect.top
    };
    this.moveCursor({dir: 0});
    this.focusStage();
    this.powerMode = new PowerMode();
    this.powerMode.draw();
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
            <SingleChar key={index} char={char} pos={index} {...props}/>
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
      this.powerMode.spawnParticles();
    }


    if (this.curPos < this.childrenTable.length - 1) {
      this.moveCursor({dir: 1});
    } else {
      this.compelete();
    }

    this.curPos += 1;
  }

  keyDown(e) {
    if (this.curPos === 0) return;

    const backSpaceKeyCode = 8;
    if (e.keyCode === backSpaceKeyCode) {
      this.moveCursor({dir: -1, isBack: true});
      this.curPos -= 1;
    }
  }

  moveCursor(args) {
    const nextChar = this.childrenTable[this.curPos + args.dir];
    const nextDom = (ReactDOM.findDOMNode(nextChar).getBoundingClientRect());
    const curRect = (ReactDOM.findDOMNode(this.cursor)).getBoundingClientRect();

    const transX = nextDom.left - this.cursorOriPos.left;
    const transY = nextDom.top - this.cursorOriPos.top;
    const props = {
      transform: `translate(${transX}px,${transY}px)`,
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

  compelete() {
    toastr.info('type complete');
    // this.visualizer.show();

    // in order to let div and svg load before call refreshData
    // setTimeout(() => this.visualizer.refreshData(this.context.store.getState().typeResult), 0);
    this.state.toggleChart(true);
    // this.visualizer.wrappedInstance.refreshData(this.context.store.getState().typeResult);
  }
}


Stage.contextTypes = {store: React.PropTypes.object};

const mapStateToProps = state => {
  console.log('map called');
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

export default connect(null, mapDispatchToProps)(Stage);