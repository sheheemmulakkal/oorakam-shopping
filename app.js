var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars')
var db=require('./config/connection')

var adminRouter = require('./routes/admin');
var userRouter = require('./routes/users');

var app = express();
var fileUpload = require('express-fileupload')

var session=require("express-session")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine( 'hbs', hbs.engine( { 
  extname: 'hbs', 
  defaultLayout: 'layout', 
  layoutsDir: __dirname + '/views/layout/',
  partialsDir: __dirname + '/views/partials/'
} ) );

app.use(fileUpload())

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(session({secret:"key",cookie:{maxAge:3600000}}))
db.connect((err)=>{
  if(err) console.log("Database connection error"+err)
  else console.log("Database connected to port 27017")
})
app.use('/admin', adminRouter);
app.use('/', userRouter);

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
