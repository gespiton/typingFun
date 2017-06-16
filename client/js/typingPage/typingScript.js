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
    this.init('select your article');
    this.keyPressed = this.keyPressed.bind(this);
    this.keydown = this.keydown.bind(this);
    this.start = this.start.bind(this);
    this.reload = this.reload.bind(this);
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
    const me = this;

    if (isBackMode()) {
      me.pressKeyAction = me.keyMode.back;
      return;
    }

    if (notRecording()) {
      if (isWordStart()) {
        me.curTimeTracer = new TimeTracer();
        me.timeTracerArr.push(me.curTimeTracer);
        me.pressKeyAction = me.keyMode.insideWord;
      } else {
        me.pressKeyAction = me.keyMode.outsideWord;
      }
    } else {
      me.pressKeyAction = me.keyMode.insideWord;
    }

    function isBackMode() {
      return me.timeTracerPos !== me.curPos;
    }
  };

  App.prototype.keyPressed = function (event) {
    // prevent browser shotcut
    event.preventDefault();
    const me = this;
    if (!this.typingStarted) {
      startWpfCal();
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

    function startWpfCal() {
      me.startTime = new Date().getTime();
      me.intervalID = setInterval(updateWpf, 200);
      me.typingStarted = true;

      // ? is this the best place to put this func?, maybe move to a Event object
      function updateWpf() {
        // console.log(this.startTime);
        let elapsed = Math.floor((new Date().getTime() - this.startTime) / 100) / 10; // why not /1000
        // alert(elapsed);
        let wpf = Math.floor((me.totalCount / 5 - this.unCorrectCharCount) / (elapsed / 60));
        if (wpf < 0) {
          wpf = 0;
        }

        $('#wpf').text(Math.floor((wpf)).toString());
      }
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

  App.prototype.getCurChar = function () {
    return $(this.domArr[this.curPos]).text();
  };

  App.prototype.check = function (pressed) {
    const me = this;
    if (pressed === this.getCurChar()) {
      correctChar();
      if (this.powerMode) {
        powerMode.spawnParticles();
      }
    } else {
      wrongChar();
    }

    function correctChar() {
      me.domArr[me.curPos].addClass('correct fadeBgc');
    }
    function wrongChar() {
      ++me.unCorrectCharCount;
      me.domArr[me.curPos].addClass('incorrect');
      if (me.curTimeTracer) {
        me.curTimeTracer.setWrong();
      }
    }
  };

  App.prototype.start = function () {
    const me = this;
    wireEvent();
    fillStage();
    setFirstChar();
    this.moveCaret();

    function setFirstChar() {
      $(me.domArr[0]).addClass('curChar');
    }

    function fillStage() {
      const $stage = $('#stage');
      const caret = $('#caret');
      $stage.empty();
      $stage.append(caret);
      for (let char in me.textArray) {
        let $charSpan = $('<span>', {
          class: 'char',
          text: me.textArray[char],
        });
        $stage.append($charSpan);
        me.domArr.push($charSpan);
      }
      me.length = me.domArr.length - 1;
    }

    function wireEvent() {
      $('').on('scroll', wheelEvent);
      $(document).on("keypress", me.keyPressed);
      $(document).on("keydown", me.keydown);

      function loginPanelEvent() {
        const $loginModel = $('#login-modal');
        $loginModel.on('focus', () => {
          console.log(isTypingPaused);
          that.pauseTyping();
        });
        $loginModel.on('focusout', () => {
          me.resumeTyping();
        });
      }

      loginPanelEvent();
    }

    function wheelEvent() {
      $(document).on('scroll', () => {
        const next = $(me.domArr[me.curPos]);
        const yOffset = next[0].getBoundingClientRect().top;
        $('#caret').css({top: yOffset});
      });
    }
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
      $(document).on('keypress', this.keyPressed);
      $(document).on('keydown', this.keydown);
      isTypingPaused = false;
    }
  };

  return new App();
}
export default typeScript();
// todo press update wpf
// todo wheel event