var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jobsRouter = require('./routes/jobs');

var app = express();

/**** DATABASE ****/
// 导入 mongoose 模块
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
// 设置默认 mongoose 连接
const mongoDB = 'mongodb+srv://backSt:info30005@info30005-9ex9v.mongodb.net/test?authSource=admin&replicaSet=INFO30005-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
//mongoose.connect(mongoDB);
MongoClient.connect(mongoDB, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("DataBase Created");
  db.close();
});

// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise;
// 取得默认连接
const db = mongoose.connection;
// 将连接与错误事件绑定（以获得连接错误的提示）
db.on('error', console.error.bind(console, 'ERROR: Connect MangoDB Failed'));
/**** DATABASE ****/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jobs', jobsRouter);

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
