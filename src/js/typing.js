$(document).keydown(function(evt) {
    $("#output").text("Key input: " + evt.keyCode)
    evt.preventDefault()
})
