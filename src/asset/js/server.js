module.exports = {
    server: function() {
        const express = require('express');
        const fs = require('fs');
        const webport = 4545;
        // Initliaze express application
        const app = new express();

        app.disable('x-powered-by');
        // Setting express port
        app.set('port', webport);
        // Start express server

        // Default index page
        app.get('/', function(req, res) {
            let index = fs.readFileSync('./src/template/index.html', 'utf8')
            res.end(index)
        });

        app.get('/typing', function(req, res) {
            let typing = fs.readFileSync('./src/template/typing.html', 'utf8')
            res.end(typing)
        });

        app.get('/', function(req, res) {
            let index = fs.readFileSync('./src/template/index.html', 'utf8')
            res.end(index)
        });

        app.get('/mainJs', function(req, res) {
            let scriptv = fs.readFileSync('./src/asset/js/main.js', 'utf8')
            res.end(scriptv)
        });

        app.get('/main.css', function(req, res) {
            console.log("style loaded");
            let style = fs.readFileSync('./src/asset/css/main.css', 'utf8')
            res.end(style)
        });

        // serve static file
        var path = require('path');
        console.log(path.toString());
        var dir = path.join(__dirname, '../');
        console.log(dir.toString());
        app.use(express.static(dir));

        app.listen(app.set('port'), function() {
            console.log(`Server run on ${webport}`)
        });
    }
}
