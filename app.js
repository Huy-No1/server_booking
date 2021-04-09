var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var conn = require('./helper/connection')
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { callbackify } = require('util');
const sequelize = require('./helper/connection');
const User = require('./model/user');
const verifyToken = require('./authentication/verifyJWT');
const bookingRouter = require('./routes/bookingticket');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/get',verifyToken, (req, res) => {
  User.findAll().then(user => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user)
  });
})
app.use('/bookingticket', bookingRouter)

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
