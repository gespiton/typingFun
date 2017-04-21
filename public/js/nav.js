/**
 * Created by sher on 23/2/2017.
 */
function addNavClickEvent() {
    $('nav>ul>li').on('click', function () {
        // alert('ha');
        $(this).addClass('navSelect');
    });
}
