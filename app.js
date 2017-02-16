var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./server/gets/index');
var typing = require('./routes/typing');
var login = require('./server/posts/login');
var wikipedia = require('node-wikipedia');
var dbs = require('./server/gets/db');
var user = require('./routes/User');
var session = require('express-session');

var app = express();

//session
app.get('/dashboard',function(req,res){
  if(!req.session.user){
    res.send('please login in first!')
    return res.status(401).send();
  }
  return res.status(200).send('Welcome to super-secret API');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/typing', typing);
app.use('/login', login);
app.use('/dbs',dbs);
app.use(session({secret:"forever321",resave:false,saveUninitialized:true}));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
