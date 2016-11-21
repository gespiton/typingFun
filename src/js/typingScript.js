var sampleText = "hi, there this is a sample text for typing";
var textArray = sampleText.split("");
var domArr = [];
var curPos = 0;
// fill the stage with char div
for (var char in textArray) {
    var dom = $("<div>",{class:"char",text:textArray[char]});
    $("#stage").append(dom);
    domArr.push(dom);
}

//set the first character as current character
$(domArr[0]).addClass("curChar");
const lengh = domArr.length;



$(document).ready(function(){
    // alert(String(3));
   $(document).keypress(function(event){
    //    alert(String.fromCharCode(event.charCode));
        check(String.fromCharCode(event.charCode));
        $(domArr[curPos++]).removeClass('curChar');
        $(domArr[curPos]).addClass('curChar');
        // $(domArr[0]).text(String.fromCharCode(event.charCode));

        // when all the text is finished, turn off the keypress event
        if (curPos==lengh) {
            $(document).off('keypress');
        }
   });

   // document.keydown('keydown', function(event) {
   //     alert("something right");
   // });
});

function check(pressed){
    // alert($(domArr[curPos]).text());
    if (pressed==$(domArr[curPos]).text()) {
        domArr[curPos].addClass('correct');
    }else {
        domArr[curPos].addClass('incorrect');
    }
}
