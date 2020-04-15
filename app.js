const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

/**** DATABASE ****/
// import mongoose module
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
// set up default mongoose connection
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

app.use(express.static('public'));

app.listen(PORT, function(){
   console.log(`Express listening on port ${PORT}`);
});

