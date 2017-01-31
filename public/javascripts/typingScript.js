//noinspection JSUnresolvedFunction
$(document).ready(function () {
    let text = $('.passin').text();
    let textArray = text.split('');
    let domArr = [];
    let curPos = 0;
    let unCorCount = 0;

    let startTime = new Date().getTime();
    let typingStarted = false;
    let intervalID;

    fillStage();
    setFirstChar();
    onKeyPressed();
    backSpaceKeyHandler();

    let length = domArr.length;


    function setFirstChar() {
        $(domArr[0]).addClass('curChar');
    }

    function startWpfCal() {
        intervalID = setInterval(updateWpf, 1000);
        typingStarted = true;
    }

    function forwardCaret() {
        $(domArr[++curPos]).addClass('curChar');
        $(domArr[curPos - 1]).removeClass('curChar');
    }

    function backCaret() {
        $(domArr[curPos]).removeClass('curChar correct incorrect fadeBgc');
        $(domArr[--curPos]).removeClass('correct incorrect fadeBgc');
        $(domArr[curPos].addClass('curChar'));

    }

    function isFinished() {
        if (curPos == length) {
            alert('finished');
            clearInterval(intervalID);
        }
    }

    function onKeyPressed() {
        $(document).on("keypress", function (event) {
            // prevent browser shotcut
            // alert(event.hasOwnProperty());
            event.preventDefault();

            if (!typingStarted) {
                startWpfCal();
            }

            check(String.fromCharCode(event.charCode));
            forwardCaret();
            isFinished();
        });
    }


    function backSpaceKeyHandler() {
        $(document).on("keydown", function (key) {
            // alert(key.keyCode);
            // 8
            if (key.keyCode == 8) {
                backCaret();
            }
        });
    }

    function updateWpf() {

        let elapsed = Math.floor((new Date().getTime() - startTime) / 100) / 10; // why not /1000
        // alert(elapsed);
        let wpf = Math.floor(((curPos + 1) / 5 - unCorCount) / (elapsed / 60));
        if (wpf < 0) {
            wpf = 0;
        }

        $('#wpf').text(Math.floor((wpf)).toString());
    }

    function fillStage() {
        for (let char in textArray) {
            let $charSpan = $('<span>', {
                class: 'char',
                text: textArray[char],
            });
            $('#stage').append($charSpan);
            domArr.push($charSpan);
        }
    }

    function correctChar() {
        domArr[curPos].addClass('correct fadeBgc');
    }

    function wrongChar() {
        ++unCorCount;
        domArr[curPos].addClass('incorrect');
    }

    function check(pressed) {
        // alert($(domArr[curPos]).text());
        if (pressed == $(domArr[curPos]).text()) {
            correctChar();
        } else {
            wrongChar();
        }
    }
});
