/**
 * Created by liliz on 2017/1/30.
 */
var wikipedia = require("node-wikipedia");
var bodyParser = require("body-parser");
var cheerio = require('cheerio');
var fs = require('fs');
var str = fs.readFileSync('./js.html');
var Str = str.toString();
$ = cheerio.load(Str);
console.log($('p').text());

