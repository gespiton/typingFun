/**
 * Created by sher on 2017/1/27 0027.
 */
$(function () {

    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    $("form").submit(function () {
        switch (this.id) {
            case "login-form":
                var $lg_username = $('#login_username').val();
                var $lg_password = $('#login_password').val();
                if ($lg_username == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }
                return true;
                break;
            case "lost-form":
                var $ls_email = $('#lost_email').val();
                if ($ls_email == "ERROR") {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
                } else {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
                }
                return true;
                break;
            case "register-form":
                var $rg_username = $('#register_username').val();
                var $rg_email = $('#register_email').val();
                var $rg_password = $('#register_password').val();
                if ($rg_username == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                } else {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
                }
                return true;
                break;
            default:
                return false;
        }
    });

    $('#login_register_btn').click(function () {
        modalAnimate($formLogin, $formRegister)
    });
    $('#register_login_btn').click(function () {
        modalAnimate($formRegister, $formLogin);
    });
    $('#login_lost_btn').click(function () {
        modalAnimate($formLogin, $formLost);
    });
    $('#lost_login_btn').click(function () {
        modalAnimate($formLost, $formLogin);
    });
    $('#lost_register_btn').click(function () {
        modalAnimate($formLost, $formRegister);
    });
    $('#register_lost_btn').click(function () {
        modalAnimate($formRegister, $formLost);
    });

    function modalAnimate($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height", $oldH);
        $oldForm.fadeToggle($modalAnimateTime, function () {
            $divForms.animate({height: $newH}, $modalAnimateTime, function () {
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }

    function msgFade($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function () {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function () {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
        }, $msgShowTime);
    }
});
$(document).ready(function () {
    var sampvarext = "My son starts school today. It's going to be strange and new to him for a while, and I wish you would sort of treat him gently. You see, up to now, he's been king of the roost. He's been boss of the backyard. I have always been around to repair his wounds, and to soothe his feelings. But now--things are going to be different. This morning, he's going to walk down the front steps, wave his hand and start on his great adventure that will probably include wars and tragedy and sorrow. To live his life in the world he has to live in will require faith and love and courage. So, World, I wish you would sort of take him by his young hand and teach him the things he will have to know. Teach him - but gently, if you can. Teach him that for every scoundrel there is a hero; that for every crooked politician there is a dedicated leader; that for every enemy there is a friend. Teach him the wonders of books. Give him quiet time to ponder the eternal mystery of birds in the sky, bees in the sun, and flowers on the green hill. Teach him it is far more honorable to fail than to cheat. Teach him to have faith in his own ideas, even if everyone tells him they are wrong. Teach him to sell his brawn and brains to the highest bidder, but never to put a price on his heart and soul. Teach him to close his ears to a howling mob...and to stand and fight if he thinks he's right. Teach him gently, World, but don't coddle him, because only the test of fire makes fine steel. This is a big order, World, but see what you can do. He's such a nice little fellow";
    var textArray = sampvarext.split('');
    var domArr = [];
    var curPos = 0;
    var unCorCount = 0;

    // timer here
    var start = new Date().getTime();
    var started = false;
    var intervalID;

    // fill the stage with char div
    for (var char in textArray) {
        var $charSpan = $('<span>', {
            class: 'char',
            text: textArray[char],
        });
        $('#stage').append($charSpan);
        domArr.push($charSpan);
    }

    //set the first character as current character
    $(domArr[0]).addClass('curChar');
    var lengh = domArr.length;

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
            domArr[curPos].addClass('correct fadeBgc');
        } else {
            ++unCorCount;
            domArr[curPos].addClass('incorrect');
        }
    }
});
