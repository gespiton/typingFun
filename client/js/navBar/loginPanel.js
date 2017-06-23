/**
 * Created by sher on 2017/1/27 0027.
 */
function loginFunc() {
  const $formLogin = $('#login-form');
  const $formLost = $('#lost-form');
  const $formRegister = $('#register-form');
  const $divForms = $('#div-forms');
  const $modalAnimateTime = 300;
  const $msgAnimateTime = 150;
  const $msgShowTime = 2000;

  $("form").submit(function () {
    switch (this.id) {
      case "login-form":
        const $lg_username = $('#login_username').val();
        const $lg_password = $('#login_password').val();
        $.post('login', {'email': $lg_username, 'password': $lg_password}, function (result) {
            console.log(result);
            changeUserState(result.logged, result.username);
            if (result.logged === false) {
              msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", result.message);
            } else {
              msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
              setTimeout(function () {
                $('#closeBT').click();
              }, 500);
            }
          }
        );
        return false;
        break;
      case "lost-form":
        const $ls_email = $('#lost_email').val();
        if ($ls_email === "ERROR") {
          msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
        } else {
          msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
        }
        return false;
        break;
      case "register-form":
        const $rg_username = $('#register_username').val();
        const $rg_email = $('#register_email').val();
        const $rg_password = $('#register_password').val();
        const $confirm_password = $('#retype_password').val();
        $.post('/register', {
            'username': $rg_username,
            'password': $rg_password,
            'email': $rg_email,
            'confirm': $confirm_password
          },
          function (result) {
            // changeUserState(result.success);
            console.log(result);
            if (result.success) {
              msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), 'success', 'glyphicon-ok', 'register success');
            } else {
              msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", result.message);
              // setTimeout(function () {
              //   $('#closeBT').click();
              // }, 900);
            }
          });
        return false;
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
    const $msgOld = $divTag.text();
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
}
loginFunc();

function changeUserState(loged, name) {
  if (loged) {
    console.log('changing');
    $('#logState').attr('src', '/images/logged.png');
    $('#username').text(name);
  } else {
    $('#logState').attr('src', '/images/login.png');
  }
}
module.exports = {
  changeUserState: changeUserState
};

