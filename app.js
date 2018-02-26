const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mainRoute = require('./server/controllers/index');
const session = require('express-session');
const app = express();
const isDev = process.env.NODE_ENV !== 'production';
const mongoose = require('mongoose');
const compression = require('compression');
const passport = require('passport'),
  LocalStrategy = require('passport-local'),
  memberShip = require('./membership/index');

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {
    memberShip.authenticate(email, password, function (err, authRes) {
      // console.log(authRes);
      if (err) return done(err);
      if (authRes.success) {
        return done(null, authRes.user, authRes);
      } else {
        return done(null, null, authRes);
      }
    });
  }
));

passport.serializeUser(function (user, done) {
  console.log('serialize called');
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  console.log('deserialize called');
  memberShip.findUserById(id, function (err, user) {
    done(err, user);
  });
});
// view engine setup
// app.set('views', path.join(__dirname, './app'));

// uncomment after placing your favicon in /public
//typing.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//typing.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(compression());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/typingFun', function (err, db) {
  if (err) throw err;
  else console.log('connected to db typingFun');
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

  // attach to the compiler & the web
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
  app.use(express.static(path.join(__dirname, 'public/')));
}


app.use(
  session(
    {
      secret: "forever321",
      resave: false,
      saveUninitialized: true,
      cookie: {
        // maxAge: 1000 * 60 * 60
      }
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  console.log(req.url);
  res.locals.user = req.user;
  next();
});

app.use('/', mainRoute);

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

if (isDev) {
  const http = require('http');
  const server = http.createServer(app);
  server.listen(3000, function () {
    console.log('App (dev) is now running on port 3000!');
  });
} else {
  app.listen(80, function () {
    console.log('typing started on port 3000');
  });
}

module.exports = app;
