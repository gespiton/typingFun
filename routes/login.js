var express = require('express');
var router = express.Router();
var formidable = require("formidable");
var util = require("util");
var http = require('http');
router.post('/', function (req, res, next) {
    console.log('i am in');
    processAllFieldsOfTheForm(req, res);
});

function processAllFieldsOfTheForm(req, res) {
    console.log('i am in process');

    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        console.log("wtf");
        res.end("haha you got me");
        // res.writeHead(200, {
        //     'content-type': 'text/plain'
        // });
        // res.write('received the data:\n\n');
        // res.end(util.inspect({
        //     fields: fields,
        //     files: files
        // }));
    });
}
module.exports = router;
