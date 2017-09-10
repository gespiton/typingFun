class TimeTracer {
  constructor() {
    this.word = '';
    this.correctWord = '';
    this.timeArr = [];
    // this.startTime = null;
    this.correct = true;
  }

  addChar(key) {
    this.word += key.pressedKey;
    this.correctWord += key.expected;
    this.timeArr.push(key.currentTime);
    if (this.correct && key.expected !== key.pressedKey)
      this.correct = false;
    this.calSpeed();
  }

  calSpeed() {
    const speed = this.timeArr.length / (this.timeArr[this.timeArr.length - 1] - this.timeArr[0]);
    this.speed = isFinite(speed) ? speed * 1000 : 0;
  }

  // calcSpeed() {
  //   return {
  //     speed: this.cal(),
  //     text: this.word,
  //     correct: this.correct
  //   };
  // }
}

const parserState = {
  pending: "PENDING",
  inworld: "IN_WORLD"
};

const isWhiteSpace = char => char === ' ';

function parseData(data) {
  const keys = data.keyStrokes;
  if (keys.length === 0) return null;

  let index = 0;
  let stat = parserState.pending;
  const resultArr = [];
  let currentTimeTracer = null;

  while (index !== keys.length) {
    const currentKey = keys[index];
    if (isWhiteSpace(currentKey.expected)) {
      if (stat === parserState.pending) {
        // waitting to start
      } else {
        // reach the end of world
        stat = parserState.pending;
      }
    } else {
      if (stat === parserState.pending) {
        // start of the world
        stat = parserState.inworld;
        currentTimeTracer = addTracer();
      } else {
        // inside world
      }
      currentTimeTracer.addChar(currentKey);
    }
    ++index;
  }

  return resultArr;

  function addTracer() {
    const tracer = new TimeTracer();
    resultArr.push(tracer);
    return tracer;
  }
}

export default parseData;