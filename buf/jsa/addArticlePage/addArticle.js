function main() {
    function parseText(text) {
        let arr = text.split('');
        for (let ite = 0; ite !== arr.length; ite += 1) {
            console.log(ite);
            if (!isASCII(arr[ite])) {
                arr.splice(ite, 1);
                --ite;
            }
        }
        return arr.join('');
    }

    function isASCII(char) {
        // console.log(char.charCodeAt(0));
        return char.charCodeAt(0) >= 0 && char.charCodeAt(0) <= 126;
    }

    const $rawTitle = $('input#rawTitle');
    const $rawContent = $(':input#rawContent');
    const $newTitle = $('input#newTitle');
    const $newContent = $(':input#newContent');


    let wireEvent = function () {
        $('#convertBT').on('click', function () {
            $newTitle.val($rawTitle.val());
            $newContent.val(parseText($rawContent.val()));
        });

    };


    wireEvent()
}

export default main;
