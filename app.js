const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const typing = require('./routes/typing');
const dbs = require('./routes/addArticle');
const login = require('./routes/login');
const wikipedia = require('node-wikipedia');
const user = require('./database/User');
const session = require('express-session');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));

// serve files
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session(
        {
            secret: "forever321",
            resave: false,
            saveUninitialized: true
        }
    )
);

app.use((req, res, next) => {
    console.log('user ' + req.session.id);
    next();
});

app.use('/', index);
app.use('/typing', typing);
app.use('/login', login);
app.use('/dbs', dbs);

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
    res.render('error');
});

module.exports = app;
