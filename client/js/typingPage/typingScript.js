import powerMode from "./powerMode";
function typeScript() {
  function isChar(char) {
    return /[a-zA-Z']/.test(char);
  }

  App.prototype.init = function (text) {
    this.text = text;
    this.textArray = text.split('');
    this.domArr = [];
    this.articleId = 'none';
    this.timeTracerArr = [];
    this.curTimeTracer = 0;
    this.recordPaused = false;
    this.timeTracerPos = 0;

    this.curPos = 0;
    this.unCorrectCharCount = 0;
    this.totalCount = 0;

    this.typingStarted = false;
    this.intervalID = 0;
    this.powerMode = true;
  };

  function App() {
    // const bind = function (fn, me) {
    //     return function () {
    //         return fn.apply(me, arguments);
    //     };
    // };
    this.init('select your article');
    this.keyPressed = this.keyPressed.bind(this);
    this.keydown = this.keydown.bind(this);
    this.updateWpf = this.updateWpf.bind(this);
    this.start = this.start.bind(this);
    this.reload = this.reload.bind(this);
    this.wheelEvent = this.wheelEvent.bind(this);
  }

  const TimeTracer = function () {
    function TimeTracer() {
      this.word = '';
      this.correctWord = '';
      this.timeArr = [];
      this.startTime = new Date().getTime();
      this.correct = true;
    }

    TimeTracer.prototype.$wpf = $('#wpf');

    TimeTracer.prototype.cal = function () {
      let speed = this.timeArr.length / (this.timeArr[this.timeArr.length - 1] - this.timeArr[0]);
      if (isFinite(speed))
        return speed * 1000;
      else
        return 0;
    };
    TimeTracer.prototype.addword = function (char) {
      this.word += char;
    };

    TimeTracer.prototype.record = function (pressed, correctChar) {
      this.timeArr.push(new Date().getTime());
      this.word += pressed;
      this.correctWord += correctChar;
    };
    TimeTracer.prototype.finish = function () {
      console.log(this.correctWord);
      this.wpf = this.$wpf.text();
    };
    TimeTracer.prototype.setWrong = function () {
      // console.log('set wrong');
      this.correct = false;
    };

    TimeTracer.prototype.calcSpeed = function () {
      return {
        speed: this.cal(),
        text: this.word,
        correct: this.correct
      };
    };
    return TimeTracer;
  }();

  App.prototype.setFirstChar = function () {
    $(this.domArr[0]).addClass('curChar');
  };

  App.prototype.startWpfCal = function () {
    this.startTime = new Date().getTime();
    this.intervalID = setInterval(this.updateWpf, 200);
    this.typingStarted = true;
  };

  App.prototype.moveCaret = function () {
    const next = $(this.domArr[this.curPos]);

    function isLastChar() {
      return !next[0];
    }

    if (isLastChar()) {
      return;
    }
    const xOffset = next[0].getBoundingClientRect().left;
    const yOffset = next[0].getBoundingClientRect().top;
    // const newWidth = next.width();
    const newWidth = -1;
    // console.log(newWidth);
    const newHeight = next.height();
    $('#caret').animate({
      "left": xOffset,
      "top": yOffset,
      width: newWidth + 4,
      height: newHeight - 4
    }, 50);
    // console.log(xOffset + " : " + yOffset);
  };

  App.prototype.forwardCaret = function () {
    $(this.domArr[1 + this.curPos]).addClass('curChar');
    $(this.domArr[this.curPos - 1]).removeClass('curChar');
    //
    this.timeTracerPos += 1;
    this.curPos += 1;

    this.moveCaret();
  };

  App.prototype.backCaret = function () {
    if (this.curPos === 0)
      return;
    $(this.domArr[this.curPos]).removeClass('curChar correct incorrect');
    $(this.domArr[--this.curPos]).removeClass('correct incorrect');
    $(this.domArr[this.curPos].addClass('curChar'));
    this.moveCaret();
  };

  App.prototype.isFinished = function () {
    return this.curPos - 1 === this.length
  };

  App.prototype.decideMode = function () {
    const notRecording = () => this.curTimeTracer === null;
    const isWordStart = () => this.recordPaused && isChar($(this.domArr[this.curPos]).text())

    if (this.isBackMode()) {
      this.pressKeyAction = this.keyMode.back;
      return;
    }

    if (notRecording()) {
      if (isWordStart()) {
        this.curTimeTracer = new TimeTracer();
        this.timeTracerArr.push(this.curTimeTracer);
        this.pressKeyAction = this.keyMode.insideWord;
      } else {
        this.pressKeyAction = this.keyMode.outsideWord;
      }
    } else {
      this.pressKeyAction = this.keyMode.insideWord;
    }
  };

  App.prototype.keyPressed = function (event) {
    // prevent browser shotcut
    event.preventDefault();
    if (!this.typingStarted) {
      this.startWpfCal();
      this.curTimeTracer = new TimeTracer();
      this.timeTracerArr.push(this.curTimeTracer);
    }
    ++this.totalCount;

    this.decideMode();
    this.pressKeyAction();
    if (this.isFinished()) {
      clearInterval(this.intervalID);
      $(document).off('keypress');
      $(document).off('keydown');
      $('#statics-window').modal('show');
    }
  };

  App.prototype.keyMode = {
    insideWord(){
      const pressed = String.fromCharCode(event.charCode);
      this.check(pressed);
      this.updateTimeTracer(pressed);
      this.forwardCaret();
    },
    back(){
      const pressed = String.fromCharCode(event.charCode);
      this.check(pressed);
      this.timeTracerPos -= 1;
      this.forwardCaret();
    },
    outsideWord(){
      const pressed = String.fromCharCode(event.charCode);
      if (isChar(pressed)) {
        this.curTimeTracer = new TimeTracer();
        this.timeTracerArr.push(this.curTimeTracer);
        this.curMode = this.keyMode.insideWord;
        return this.curMode();
      }
      this.check(pressed);
      this.forwardCaret();
    }
  };
  const backSpaceKeyCode = 8;
  App.prototype.keydown = function (key) {
    if (key.keyCode === backSpaceKeyCode) {
      this.backCaret();
    }
  };

  App.prototype.updateWpf = function () {

    // console.log(this.startTime);
    let elapsed = Math.floor((new Date().getTime() - this.startTime) / 100) / 10; // why not /1000
    // alert(elapsed);
    let wpf = Math.floor((this.totalCount / 5 - this.unCorrectCharCount) / (elapsed / 60));
    if (wpf < 0) {
      wpf = 0;
    }

    $('#wpf').text(Math.floor((wpf)).toString());
  };

  App.prototype.fillStage = function () {
    const $stage = $('#stage');
    const caret = $('#caret');
    $stage.empty();
    $stage.append(caret);
    for (let char in this.textArray) {
      let $charSpan = $('<span>', {
        class: 'char',
        text: this.textArray[char],
      });
      $stage.append($charSpan);
      this.domArr.push($charSpan);
    }
    this.length = this.domArr.length - 1;
  };

  App.prototype.updateTimeTracer = function (pressed) {


    this.curTimeTracer.record(pressed, this.getCurChar());

    if (reachWordEnd.call(this)) {
      this.curTimeTracer.finish();
      this.curTimeTracer = null;
      this.recordPaused = true;
    }


    function reachWordEnd() {
      if (this.curPos === this.domArr.length - 1) return true;
      // console.log($(this.domArr[this.curPos + 1]).text());
      return !isChar($(this.domArr[this.curPos + 1]).text());
    }
  };

  App.prototype.isBackMode = function () {
    return this.timeTracerPos !== this.curPos;
  };

  App.prototype.correctChar = function (pressed) {
    this.domArr[this.curPos].addClass('correct fadeBgc');
  };

  App.prototype.wrongChar = function (pressed) {
    ++this.unCorrectCharCount;
    this.domArr[this.curPos].addClass('incorrect');
    if (this.curTimeTracer) {
      this.curTimeTracer.setWrong();
    }
  };

  App.prototype.getCurChar = function () {
    return $(this.domArr[this.curPos]).text();
  };

  App.prototype.check = function (pressed) {
    if (pressed === this.getCurChar()) {
      this.correctChar(pressed);
      if (this.powerMode) {
        powerMode.spawnParticles();
      }
    } else {
      this.wrongChar(pressed);
    }


  };

  App.prototype.wheelEvent = function () {
    $(document).on('scroll', () => {
      const next = $(this.domArr[this.curPos]);
      const yOffset = next[0].getBoundingClientRect().top;
      $('#caret').css({top: yOffset});
    });
  };

  App.prototype.wireEvent = function () {
    $('').on('scroll', this.wheelEvent);
    $(document).on("keypress", this.keyPressed);
    $(document).on("keydown", this.keydown);


    const that = this;

    function loginPanelEvent() {
      const $loginModel = $('#login-modal');
      $loginModel.on('focus', () => {
        console.log(isTypingPaused);
        that.pauseTyping();
      });
      $loginModel.on('focusout', () => {
        that.resumeTyping();
      });
    }

    loginPanelEvent();
  };

  App.prototype.start = function () {
    this.wireEvent();
    this.fillStage();
    this.setFirstChar();
    this.moveCaret();
  };

  App.prototype.getSpeedArr = function () {
    let arr = [];
    // console.log(this.timeTracerArr);
    this.timeTracerArr.forEach((o) => {
      if (o.word.length > 1)
        arr.push(o.calcSpeed());
    });
    return arr;
  };

  App.prototype.reload = function (article) {
    clearInterval(this.intervalID);
    $(document).off('keypress');
    $(document).off("keypress", this.keyPressed);
    $(document).off("keydown", this.keydown);
    $(document).off('scroll');
    this.init(article.text);
    this.start();
    this.articleId = article.articleId;
  };

  let isTypingPaused = false;
  App.prototype.pauseTyping = function () {
    if (!isTypingPaused) {
      $(document).off('keypress');
      $(document).off('keydown');
      isTypingPaused = true;
    }
  };

  App.prototype.resumeTyping = function () {
    if (isTypingPaused) {
      $(document).on('keypress',this.keyPressed);
      $(document).on('keydown',this.keydown);
      isTypingPaused = false;
    }
  };

  return new App();
}
export default typeScript();
// todo press update wpf
// todo wheel event