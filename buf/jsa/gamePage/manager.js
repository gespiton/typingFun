const Sketch = require('../library/sketch');
// console.log(sketch);
import WordInit from "./Word";


function main(args) {
  console.log(args);
  const WordArr = [];

  const ctx = Sketch.create({container: args.container});
  ctx.draw = function () {
    if (WordArr.length > 0) {
      WordArr[0].draw();
    }
  };

  const Word = WordInit(ctx, $('canvas.sketch'));
  // ctx.textAlign = 'right';
  // const one = new Word({text: 'you', size: 10});

  (function createWordArr(text) {
    const buf = text.split(' ');
    buf.forEach(word => {
      WordArr.push(new Word({text: word, size: 10}));
    });
  })(args.text);

  (function wireEvent() {
    $('body').on('keypress', (key) => {
      WordArr[0].judge({key: key.key}, function ifFinish() {
        WordArr.shift();
      });
    });
  })();

}

export default main;