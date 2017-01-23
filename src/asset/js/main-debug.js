console.log("Index page");

$(document).ready(function () {
  var sampleText = "My son starts school today. It's going to be strange and new to him for a while, and I wish you would sort of treat him gently. You see, up to now, he's been king of the roost. He's been boss of the backyard. I have always been around to repair his wounds, and to soothe his feelings. But now--things are going to be different. This morning, he's going to walk down the front steps, wave his hand and start on his great adventure that will probably include wars and tragedy and sorrow. To live his life in the world he has to live in will require faith and love and courage. So, World, I wish you would sort of take him by his young hand and teach him the things he will have to know. Teach him - but gently, if you can. Teach him that for every scoundrel there is a hero; that for every crooked politician there is a dedicated leader; that for every enemy there is a friend. Teach him the wonders of books. Give him quiet time to ponder the eternal mystery of birds in the sky, bees in the sun, and flowers on the green hill. Teach him it is far more honorable to fail than to cheat. Teach him to have faith in his own ideas, even if everyone tells him they are wrong. Teach him to sell his brawn and brains to the highest bidder, but never to put a price on his heart and soul. Teach him to close his ears to a howling mob...and to stand and fight if he thinks he's right. Teach him gently, World, but don't coddle him, because only the test of fire makes fine steel. This is a big order, World, but see what you can do. He's such a nice little fellow";
  var textArray = sampleText.split('');
  var domArr = [];
  var curPos = 0;

  // count the correct word
  var unCorCount = 0;

  // timer here
  var start = new Date().getTime();
  var started = false;
  var intervalID;

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

  $(document).keypress(function (event) {
      // prevent browser shotcut
      event.preventDefault();

      if (!started) {
        intervalID = setInterval(updateWpf, 1000);
        started = true;
      }

      check(String.fromCharCode(event.charCode));
      $(domArr[++curPos]).addClass('curChar');
      $(domArr[curPos - 1]).removeClass('curChar');

      // when all the text is finished, turn off the keypress event
      if (curPos == lengh) {
        alert('finished');
        clearInterval(intervalID);
      }
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

});
