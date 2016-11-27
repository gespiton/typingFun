var sampleText = 'hi, there this is a sample t';
var textArray = sampleText.split('');
var domArr = [];
var curPos = 0;

// count the correct word
var unCorCount = 0;

// timer here
var start = new Date().getTime();
var started = false;

// fill the stage with char div
for (var char in textArray) {
  var $dom = $('<span>', {
      class: 'char',
      text: textArray[char],
    });
  $('#stage').append($dom);
  domArr.push($dom);
}

//set the first character as current character
$(domArr[0]).addClass('curChar');
var lengh = domArr.length;

$(document).ready(function () {
    $(document).keypress(function (event) {
        if (!started) {
          setInterval(updateWpf, 1000);
          started = true;
        }

        check(String.fromCharCode(event.charCode));
        $(domArr[curPos++]).removeClass('curChar');
        $(domArr[curPos]).addClass('curChar');

        // when all the text is finished, turn off the keypress event
        if (curPos == lengh) {
          $(document).off('keypress');
        }
      });

  });

function updateWpf() {

  var elapsed = Math.floor((new Date().getTime() - start) / 100) / 10; // why not /1000
  // alert(elapsed);
  var wpf = Math.floor(((curPos + 1) / 5 - unCorCount) / (elapsed / 60));
  if (wpf < 0) {
    wpf = 0;
  }

  $('#wpf').text(Math.floor((wpf)).toString());
}

function check(pressed) {
  // alert($(domArr[curPos]).text());
  if (pressed == $(domArr[curPos]).text()) {
    domArr[curPos].addClass('correct');
  } else {
    ++unCorCount;
    domArr[curPos].addClass('incorrect');
  }
}
