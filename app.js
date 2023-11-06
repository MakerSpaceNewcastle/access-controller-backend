var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const cookieParser = require("cookie-parser");


const loginService = require('./services/login');

var authRouter = require ('./routes/auth');

var devicesRouter = require('./routes/devices');
var usersRouter = require('./routes/users');
var controllersRouter = require ('./routes/controllers');
var logRouter = require('./routes/logger');

var adminsRouter = require ('./routes/admins');


var app = express();

var cors = require('cors');

/* Load .env file for config details */
const dotenv = require('dotenv');
dotenv.config();

app.use(cookieParser());
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Login page
app.use('/auth', authRouter);

//Insecure routes for the devices to get DB updates/log access
app.use('/controllers', controllersRouter);
//Need to fix this to allow posting to logs, but not viewing then
app.use('/logs', logRouter);

//Won't get beyond this check without being logged in
app.use("*",  loginService.checkLoggedIn);

//Secure, authenticated endpoints for manipulating devices and users
app.use('/users', usersRouter);
app.use('/devices', devicesRouter);

app.use('/admins', adminsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(403));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.sendStatus(err.status || 500 );
});

module.exports = app;
