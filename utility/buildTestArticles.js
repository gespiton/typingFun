const mongoose = require('mongoose');
const Article = require("../article-manager/models/Article");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/typingFun', function (err, db) {
    if (err) throw err;
    else console.log('connected to db');


    const data = [
        {
            name: 'first',
            text: 'this is the first article'
        },
        {
            name: 'second',
            text: 'this is the second article'
        },
        {
            name: 'third',
            text: 'this is the third article'
        },
        {
            name: 'forth',
            text: 'this is the forth article',
            sub: [
                {
                    name: 'fifth',
                    text: 'this is the fifth article',
                }
            ]
        },
    ];

    console.log(err);
    mongoose.disconnect();
});

