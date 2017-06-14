const BezierEasing = require("bezier-easing");
function init(ctx, $canvas) {
  class Char {
    constructor(args) {
      this.text = args.text;
      this.fillStyle = args.fillStyle;
      this.size = args.size;
    }


    strokeText(text, style, pos) {
      this.ctx.font = "500px fira sans";
      if (style.lineWidth)
        this.ctx.lineWidth = style.lineWidth;
      if (style.color)
        this.ctx.strokeStyle = style.color;
      this.ctx.strokeText(text, pos.x, pos.y);
    };


    draw(args) {
      ctx.textAlign = 'center';
      ctx.font = `${args.size}px Open`;
      ctx.fillStyle = this.fillStyle;
      ctx.fillText(this.text, args.x, args.y);
    }
  }
  class Word {

    createCharArr() {
      this.CharObjArr = [];
      const buf = this.text.split('');
      buf.forEach(c => this.CharObjArr.push(new Char({text: c, fillStyle: 'pink', size: 10})));
    }

    getMaxSize() {
      return $canvas.width() / ( (this.text.length) / (this.text.length / 8  ));
    }

    calcTotalSteps() {
      // calc the total frames needed to display the text

      const elapsePerChar = Word.elapsePerChar();
      return elapsePerChar * this.text.length / (this.text.length / 7) * 60;
    }
    static elapsePerChar() {
      return 0.2;
    }

    constructor(args) {
      this.text = args.text;
      this.createCharArr();
      this.size = 10;
      this.minSize = 10;
      this.maxSize = this.getMaxSize();
      this.action = this.grow;
      this.growSpeed = 7;
      this.shrinkSpeed = 5;
      this.curCharIndex = 0;
      this.step = 0;
      this.totalSteps = this.calcTotalSteps();
    }

    draw() {
      let posX = $canvas.width() / 2 - this.text.length * this.size / 4;
      this.CharObjArr.forEach(char => {
        char.draw({x: posX, y: $canvas.height() / 2, size: this.size});
        posX += this.size/7*4;
      });
      this.updateSteps();
    }

    grow() {
      this.step += 1;
    }

    shrink() {
      this.step -= 2;
    }

    updateSteps() {
      if (this.step >= this.totalSteps) {
        this.action = this.shrink;
      }

      if (this.step <= 0) {
        this.action = this.grow;
      }

      this.action();
      this.size = this.getEasingSize();
    }

    isFinish(finish) {
      if (this.curCharIndex === this.CharObjArr.length) {
        finish();
      }
    }

    judge(args, finish) {
      const curChar = this.CharObjArr[this.curCharIndex];
      if (args.key === this.text[this.curCharIndex]) {
        curChar.fillStyle = `rgb(${Math.round(random(150, 250))},${Math.round(random(100, 250))},${parseInt(random(180, 250))})`;
      } else {
        curChar.fillStyle = `#aaa`;
      }
      this.curCharIndex += 1;
      this.isFinish(finish);
      console.log('hit');
    }

    getEasingSize() {
      const i = this.step / this.totalSteps;
      return this.maxSize * BezierEasing(0, .91, .56, 1.02)(i);
    }

  }

  return Word;
}

export default init;