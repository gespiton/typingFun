/**
 * Created by sher on 2017/2/4 0004.
 */

$(document).ready(function () {
    loginFunc();
    buttonListen();


    // turn off wpf calc when log in
    $('#logState').on('click', function () {
        $(document).off('keypress');
    });
});