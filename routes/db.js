/**
 * Created by liliz on 2017/2/1.
 */
//visit by /dbs,you can add chapters to database
var express = require('express');
var fs = require('fs');
var formidable = require('formidable');
var book = require('./book.js');
var express = require('express');
var router = express.Router();

router.get('/',function (req,res) {
    var dbs = fs.readFileSync('./routes/db.html','utf-8');
    res.end(dbs);
});
router.post('/',function(req,res){
    console.log(req.body);

        var chapter = req.body.chapter;
        var content = req.body.content;
        res.send(chapter+"\n"+content);

        var newbook = new book();
        newbook.chapter = chapter;
        newbook.content = content;
        newbook.save(function (err,savebook) {
            if(err)
            {
                console.log(err);
                return res.status(500).send();
            }
            return res.status(200).send();
        });
});

module.exports = router;