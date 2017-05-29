// require('../css/font-files/firasans-extralightitalic-webfont.woff2');
// require('../css/font-files/firasans-extralightitalic-webfont.woff');
function typeScript() {
    function App() {
        // const bind = function (fn, me) {
        //     return function () {
        //         return fn.apply(me, arguments);
        //     };
        // };
        this.text = $('.passin').text();
        this.textArray = this.text.split('');
        this.domArr = [];

        this.timeTracerArr = [];
        this.curTimeTracer = 0;
        this.pauseRecord = false;
        this.timeTracerPos = 0;

        this.curPos = 0;
        this.inCorCount = 0;
        this.totalCount = 0;

        this.typingStarted = false;
        this.intervalID = 0;
        this.powerMode = true;
        this.keyPressed = this.keyPressed.bind(this);
        this.keydown = this.keydown.bind(this);
        this.updateWpf = this.updateWpf.bind(this);
        this.start = this.start.bind(this);


    }

    const TimeTracer = function () {
        function TimeTracer() {
            this.word = '';
            this.timeArr = [];
            this.startTime = new Date().getTime();
            this.correct = true;
            this.cal = function () {
                let speed = this.timeArr.length / (this.timeArr[this.timeArr.length - 1] - this.timeArr[0])
                if (isFinite(speed))
                    return speed * 1000;
                else
                    return 0;
            }
        }

        TimeTracer.prototype.addword = function (char) {
            this.word += char;
        };

        TimeTracer.prototype.record = function (char) {
            this.timeArr.push(new Date().getTime());
            this.word += char;
        };
        TimeTracer.prototype.finish = function () {
            console.log(this.word);
            console.log(this.timeArr);
        };
        TimeTracer.prototype.setWrong = function () {
            console.log('set wrong');
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
        this.intervalID = setInterval(this.updateWpf, 1000);
        this.typingStarted = true;
    };

    App.prototype.moveCaret = function () {
        const next = $(this.domArr[this.curPos]);
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
        $(this.domArr[++this.curPos]).addClass('curChar');
        $(this.domArr[this.curPos - 1]).removeClass('curChar');
        this.moveCaret();
    };

    App.prototype.backCaret = function () {
        if (this.curPos === 0)
            return;
        $(this.domArr[this.curPos]).removeClass('curChar correct incorrect fadeBgc');
        $(this.domArr[--this.curPos]).removeClass('correct incorrect fadeBgc');
        $(this.domArr[this.curPos].addClass('curChar'));
        this.moveCaret();
    };

    App.prototype.isFinished = function () {
        if (this.curPos === this.length) {
            alert('finished');
            clearInterval(this.intervalID);
            $(document).off('keypress');
            this.timeTracerArr.map((buf) => console.log(buf.word + ' '));
            $('#statics-window').modal('show');
            return true;
        }
    };

    App.prototype.keyPressed = function (event) {
        // prevent browser shotcut
        // alert(event.hasOwnProperty());
        event.preventDefault();
        if (!this.typingStarted) {
            this.startWpfCal();
            this.curTimeTracer = new TimeTracer();
            this.timeTracerArr.push(this.curTimeTracer);
        }
        ++this.totalCount;
        this.check(String.fromCharCode(event.charCode));
        if (this.isFinished())
            return;
        this.forwardCaret();
    };

    App.prototype.keydown = function (key) {
        // alert(key.keyCode);
        // 8
        if (key.keyCode === 8) {
            this.backCaret();
        }
    };

    App.prototype.updateWpf = function () {

        console.log(this.startTime);
        let elapsed = Math.floor((new Date().getTime() - this.startTime) / 100) / 10; // why not /1000
        // alert(elapsed);
        let wpf = Math.floor((this.totalCount / 5 - this.inCorCount) / (elapsed / 60));
        if (wpf < 0) {
            wpf = 0;
        }

        $('#wpf').text(Math.floor((wpf)).toString());
    };

    App.prototype.fillStage = function () {
        const $stage = $('#stage');
        // const caret = $('#caret');
        // $stage.empty();
        // $stage.append(caret);
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
        if (this.timeTracerPos === this.curPos) {
            if (/[a-zA-Z']/.test($(this.domArr[this.curPos]).text()))
                if (this.pauseRecord) {
                    this.curTimeTracer = new TimeTracer();
                    this.timeTracerArr.push(this.curTimeTracer);
                    this.curTimeTracer.record(pressed);
                    this.pauseRecord = false;
                } else
                    this.curTimeTracer.record(pressed);
            else {
                this.curTimeTracer.finish();
                this.pauseRecord = true;
            }
            ++this.timeTracerPos;
        }
    };

    App.prototype.correctChar = function (pressed) {
        this.domArr[this.curPos].addClass('correct fadeBgc');
        this.updateTimeTracer(pressed);
    };

    App.prototype.wrongChar = function (pressed) {
        ++this.inCorCount;
        this.domArr[this.curPos].addClass('incorrect');
        this.updateTimeTracer(pressed);
        this.curTimeTracer.setWrong();
    };

    App.prototype.check = function (pressed) {
        // alert($(this.domArr[this.curPos]).text());
        if (pressed === $(this.domArr[this.curPos]).text()) {
            this.correctChar(pressed);
            if (this.powerMode)
                app.spawnParticles();
        } else {
            this.wrongChar(pressed);
        }
    };

    App.prototype.wheelEvent = function () {
        $(document).on('scroll', function () {
            const next = $(this.domArr[this.curPos]);
            const yOffset = next[0].getBoundingClientRect().top;
            $('#caret').css({top: yOffset});
            console.log($('#stage').scrollTop());
        });
    };

    App.prototype.start = function () {
        $(document).on('scroll', this.wheelEvent);
        this.fillStage();
        this.setFirstChar();
        $(document).on("keypress", this.keyPressed);
        $(document).on("keydown", this.keydown);
        this.moveCaret();
    };

    App.prototype.getSpeedArr = function () {
        let arr = [];
        console.log(this.timeTracerArr);
        this.timeTracerArr.forEach((o) => {
            if (o.word.length > 1)
                arr.push(o.calcSpeed());
        });
        return arr;
    };
    return new App();
}
module.exports = typeScript();
// todo press update wpf
// todo wheel event