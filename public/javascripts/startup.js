/**
 * Created by sher on 2017/2/4 0004.
 */

$(document).ready(function () {
    loginFunc();
    // alert('main ready');
    // turn off wpf calc when log in
    $('#logState').on('click', function () {
        $(document).off('keypress');
    });


    // don't know why, but it seems that delay is necessary,
    // otherwise I get 400 error
    setTimeout(getLogState, 10);
});

function getLogState() {
    $.post('login', {'verify': true}, function (result) {
            changeIcon(result.loged);
            console.log('posted');
            console.log(result.loged);
        }
    );
}
function changeIcon(loged) {
    if (loged) {
        $('#logState').attr('src', '/images/loged.png');
    } else {
        $('#logState').attr('src', '/images/login.png');
    }
}