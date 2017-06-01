const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const index = require('./server/routes/index');
const session = require('express-session');
const app = express();
const isDev = process.env.NODE_ENV !== 'production';
const mongoose = require('mongoose');
const compression = require('compression');

// view engine setup
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());

//
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/typingFun', function (err, db) {
    if (err) throw err;
    else console.log('connected to db');
});

// serve files
if (isDev) {
    // static assets served by webpack-dev-middleware & webpack-hot-middleware for development
    console.log('dev mode');
    const webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('./webpack.config.js');

    const compiler = webpack(webpackDevConfig);

    // attach to the compiler & the server
    app.use(webpackDevMiddleware(compiler, {

        // public path should be the same with webpack config
        publicPath: webpackDevConfig.output.publicPath,
        // noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler, {
        log: console.log
    }));


} else {
    app.use(express.static(path.join(__dirname, 'public')));
}


app.use(
    session(
        {
            secret: "forever321",
            resave: false,
            saveUninitialized: true
        }
    )
);

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

if (isDev) {
    const http = require('http');
    const server = http.createServer(app);
    server.listen(3000, function () {
        console.log('App (dev) is now running on port 3000!');
    });
} else {
    app.listen(3000, function () {
        console.log('app started on port 3000');
    });
}
module.exports = app;
