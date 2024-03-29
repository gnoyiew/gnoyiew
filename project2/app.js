var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
const mysql = require('mysql');
var appConfig = require('config');

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var inputRouter = require('./routes/input');
var usersRouter = require('./routes/users');

var app = express();

const pool = mysql.createPool({
  host: appConfig.database.host,
  user: appConfig.database.user,
  password: appConfig.database.password,
  port: appConfig.database.port,
  database: appConfig.database.database
});

pool.getConnection(function (err, connection) {
  if (err) {
      console.error(err);
      return;
  }
  console.log('succcess');
  connection.release();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('a1b2c3'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/input', inputRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
