/**
 * Created by binbin on 2018/10/16.
 */
var http = require('http');
var mongoose = require("mongoose");

http.createServer(function(req,res){
  res.writeHead(200,{'Content-type':'text-plain'})
  res.write('Hello Nodejs');
  // var MongoClient = require('mongodb').MongoClient;
  // var url = "mongodb://localhost:27017/demo";
  //
  // //插入表
  // var insertDocument = (db,callback)=>{
  //   db.collection('users').insertOne({
  //     name:"binguo",
  //     age:21
  //   },(err,result)=>{
  //     console.log('插入数据成功');
  //     callback();
  //   })
  // }
  //
  // MongoClient.connect(url, function(err, client) {
  //   //client参数是连接成功之后的mongoclient(数据库客户端)
  //   if (err) throw err;
  //   console.log("数据库已创建!");
  //   let db = client.db("demo");
  //   insertDocument(db,()=>{
  //     db.close();
  //   });
  // });
  mongoose.connect('mongodb://localhost/demo');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
    let Schema = mongoose.Schema({
      category:String,
      name:String
    });
    Schema.methods.eat = function () {
      console.log("I've eatten one" + this.name);
    }
    //继承一个schema
    let Model = mongoose.model("fruit",Schema);
    //生成一个document
    let apple = new Model({
      category:'apple',
      name:'apple'
    })
  apple.save((err,apple)=>{
    if(err) return console.log(err);
    apple.eat();
    //查找数据;
    Model.find({name:'apple'},(err,data)=>{
      console.log(data);
    })
  });
  });

  res.end("服务器已启动");
}).listen(2028);
