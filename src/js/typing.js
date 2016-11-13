// contraller variable
var done = false
var demoString = "Typing fun!"
var stringSplit = demoString.split('')
var charNum = stringSplit.length
var crChar = 0
var domArr = []

for (var i in stringSplit) {
    var dom = $("<div class='character'>").text(stringSplit[i])
    $(".typingStage").append(dom)
    domArr.push(dom)
}

domArr[crChar].addClass("selection")

$(document).keydown(function(evt) {
    if (!done) checkKey(evt)
})

function keyValueProduct(evt) {
    if (evt.shiftKey) {
        if (keyvalue["shift_" + evt.keyCode])
            return keyvalue["shift_" + evt.keyCode]
    } else {
        if (keyvalue[evt.keyCode])
            return keyvalue[evt.keyCode]
    }

    return false
}

// productCode()
// function productCode() {
//     var string = "{"
//     function additionSpecialKey(keycode, value, caps, shift) {
//         if (!caps) {
//             if (!shift) string += "\"" + keycode + "\":\"" + value + "\","
//             else string += "\"shift_" + keycode + "\":\"" + value + "\","
//         } else string += "\"caps_" + keycode + "\":\"" + value + "\","
//     }
//
//     function additionGroup(groupValue, groundStartNumber, caps, shift) {
//         var splitValue = groupValue.split('')
//         for (var i in splitValue) {
//             additionSpecialKey(groundStartNumber,splitValue[i],caps,shift)
//             groundStartNumber++
//         }
//     }
//
//     additionGroup('abcdefghijklmnopqrstuvwxyz',65)
//     additionGroup('ABCDEFGHIJKLMNOPQRSTUVWXYZ',65,false,true)
//     additionGroup('0123456789',48)
//     additionGroup('0123456789',96)
//     additionGroup(')!@#$%^&*(',48,false,true)
//     additionGroup(';=,-./`',186)
//     additionGroup(':+<_>?~',186,false,true)
//     additionGroup('[\\]\'',219)
//     additionGroup('{|}"',219,false,true)
//     additionGroup('*+',106)
//     additionGroup('-./',109)
//     additionSpecialKey(32," ")
//     additionSpecialKey(32," ",false,true)
//
//     string += "}"
//     console.log(string)
// }

function setPoint(correct) {
    if (correct) domArr[crChar].addClass('correct')
    else domArr[crChar].addClass('incorrect')
}

function checkKey(evt) {
    var stat = keyValueProduct(evt)
    if (stat) {
        if (stringSplit[crChar] == stat) setPoint(true)
        else setPoint(false)

        domArr[crChar].removeClass("selection")
        crChar ++
        if (stringSplit[crChar]) domArr[crChar].addClass("selection")
        evt.preventDefault()
    }
}
