function main(req, res) {
    res.render('index', {title: 'TypingFun'});
}


module.exports = {
    actionList: [
        {action: 'get', url: '/', func: main}
    ]
};
