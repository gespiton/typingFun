//noinspection JSUnresolvedFunction
$(document).ready(function () {
    let sampvarext = $('.passin').text();
    console.log(sampvarext);
    let textArray = sampvarext.split('');
    let domArr = [];
    let curPos = 0;
    let unCorCount = 0;

    // timer here
    let start = new Date().getTime();
    let started = false;
    let intervalID;

    // fill the stage with char div
    for (let char in textArray) {
        let $charSpan = $('<span>', {
            class: 'char',
            text: textArray[char],
        });
        $('#stage').append($charSpan);
        domArr.push($charSpan);
    }

    //set the first character as current character
    $(domArr[0]).addClass('curChar');
    let length = domArr.length;

    $(document).on("keypress",function (event) {
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
        if (curPos == length) {
            alert('finished');
            clearInterval(intervalID);
        }
    });

    function updateWpf() {

        let elapsed = Math.floor((new Date().getTime() - start) / 100) / 10; // why not /1000
        // alert(elapsed);
        let wpf = Math.floor(((curPos + 1) / 5 - unCorCount) / (elapsed / 60));
        if (wpf < 0) {
            wpf = 0;
        }

        $('#wpf').text(Math.floor((wpf)).toString());
    }

    function check(pressed) {
        // alert($(domArr[curPos]).text());
        if (pressed == $(domArr[curPos]).text()) {
            domArr[curPos].addClass('correct fadeBgc');
        } else {
            ++unCorCount;
            domArr[curPos].addClass('incorrect');
        }
    }
});
