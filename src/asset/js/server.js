module.exports = {
    fileMatch: {
        '/': './src/template/index.html',
        '/typing': './src/template/typing.html',
        '/mainJs': './src/asset/js/main.js',
        '/main.css': './src/asset/css/main.css'
    },

    runServer: function() {
        const express = require('express');
        const fs = require('fs');
        const webport = 4545;
        const app = new express();
        const pageMatch = this.fileMatch;
        app.disable('x-powered-by');
        app.set('port', webport);

        for(let r in this.fileMatch){
            console.log(r+':'+pageMatch[r]);
            app.get(r,function (req,res) {
                console.log(typeof r + r.toString());
                let resource = fs.readFileSync(pageMatch[r],'utf8');
                res.end(resource);
            });
        }

        app.post('/login',function (req,res) {
            res.end("i clicked login");
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
