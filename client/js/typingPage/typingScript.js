// require('../css/font-files/firasans-extralightitalic-webfont.woff2');
// require('../css/font-files/firasans-extralightitalic-webfont.woff');
function typeScript() {
    let text = $('.passin').text();
    let textArray = text.split('');
    let domArr = [];

    let timeTracerArr = [];
    let curTimeTracer;
    let pauseRecord = false;
    let timeTracerPos = 0;

    let curPos = 0;
    let inCorCount = 0;
    let totalCount = 0;

    let startTime = new Date().getTime();
    let typingStarted = false;
    let intervalID;
    let powerMode = true;
    fillStage();
    setFirstChar();
    onKeyPressed();
    backSpaceKeyHandler();
    moveCaret();
    // setInterval(wheelEvent, 1);
    $(document).on('scroll', wheelEvent);

    let length = domArr.length - 1;

    function setFirstChar() {
        $(domArr[0]).addClass('curChar');
    }

    function startWpfCal() {
        intervalID = setInterval(updateWpf, 1000);
        typingStarted = true;
    }

    function moveCaret() {
        const next = $(domArr[curPos]);
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
    }

    function forwardCaret() {
        $(domArr[++curPos]).addClass('curChar');
        $(domArr[curPos - 1]).removeClass('curChar');
        moveCaret();
    }

    function backCaret() {
        if (curPos == 0)
            return;
        $(domArr[curPos]).removeClass('curChar correct incorrect fadeBgc');
        $(domArr[--curPos]).removeClass('correct incorrect fadeBgc');
        $(domArr[curPos].addClass('curChar'));
        moveCaret();
    }

    function isFinished() {
        if (curPos === length) {
            alert('finished');
            clearInterval(intervalID);
            $(document).off('keypress');
            timeTracerArr.map((buf) => console.log(buf.word + ' '));
            return true;
        }
    }

    function onKeyPressed() {
        $(document).on("keypress", function (event) {
            // prevent browser shotcut
            // alert(event.hasOwnProperty());

            event.preventDefault();
            if (!typingStarted) {
                startWpfCal();
                curTimeTracer = new TimeTracer();
                timeTracerArr.push(curTimeTracer);
            }
            ++totalCount;
            check(String.fromCharCode(event.charCode));
            if (isFinished())
                return;
            forwardCaret();
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
        let wpf = Math.floor((totalCount / 5 - inCorCount) / (elapsed / 60));
        if (wpf < 0) {
            wpf = 0;
        }

        $('#wpf').text(Math.floor((wpf)).toString());
    }

    function fillStage() {
        const $stage = $('#stage');
        // const caret = $('#caret');
        // $stage.empty();
        // $stage.append(caret);
        for (let char in textArray) {
            let $charSpan = $('<span>', {
                class: 'char',
                text: textArray[char],
            });
            $stage.append($charSpan);
            domArr.push($charSpan);
        }
    }

    function updateTimeTracer(pressed) {
        if (timeTracerPos === curPos) {
            if (/[a-zA-Z]/.test($(domArr[curPos]).text()))
                if (pauseRecord) {
                    curTimeTracer = new TimeTracer();
                    timeTracerArr.push(curTimeTracer);
                    curTimeTracer.record(pressed);
                    pauseRecord = false;
                } else
                    curTimeTracer.record(pressed);
            else {
                curTimeTracer.finish();
                pauseRecord = true;
            }
            ++timeTracerPos;
        }
    }

    function correctChar(pressed) {
        domArr[curPos].addClass('correct fadeBgc');
        updateTimeTracer(pressed);
    }

    function wrongChar(pressed) {
        ++inCorCount;
        domArr[curPos].addClass('incorrect');
        updateTimeTracer(pressed);
    }

    function check(pressed) {
        // alert($(domArr[curPos]).text());
        if (pressed === $(domArr[curPos]).text()) {
            correctChar(pressed);
            if (powerMode)
                app.spawnParticles();
        } else {
            wrongChar(pressed);
        }
    }

    function wheelEvent() {
        $(document).on('scroll', function () {

        });
        const next = $(domArr[curPos]);
        const yOffset = next[0].getBoundingClientRect().top;
        $('#caret').css({top: yOffset});
        console.log($('#stage').scrollTop());
    }

    const TimeTracer = function () {
        function TimeTrackerImpl() {
            this.word = '';
            this.timeArr = [];
            this.startTime = new Date().getTime();
        }

        TimeTrackerImpl.prototype.addword = function (char) {
            this.word += char;
        };

        TimeTrackerImpl.prototype.record = function (char) {
            this.timeArr.push(new Date().getTime());
            this.word += char;
        };
        TimeTrackerImpl.prototype.finish = function () {
            console.log(this.word);
            console.log(this.timeArr);
        };
        return TimeTrackerImpl;
    }();
}
module.exports = typeScript;