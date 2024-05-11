var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const options = require('./knexfile.js')
const knex = require('knex')(options)


var app = express();

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let mysqlRouter = require('./routes/mysql')
let registerRouter = require('./routes/register');
let loginRouter = require('./routes/login');
let removeRouter = require('./routes/remove');
let insertRouter = require('./routes/insert');
const db = require('./database/db');

const mysql=require('mysql2');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(db);
app.use((req,res,next)=>{
  req.db=knex
  next()
})

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/users/register',registerRouter);
app.use('/api/users/login',loginRouter);
app.use('/api/insert',insertRouter);
app.use('/api/remove',removeRouter);

app.get('/knex',function(req,res,next){     
  req.db.raw("SELECT VERSION()").then(         
  (version) => console.log((version[0][0]))     
  ).catch((err) => { console.log( err); throw err })
      res.send("Version Logged successfully"); 
  }); 
  

app.use('/mysql',mysqlRouter)

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
