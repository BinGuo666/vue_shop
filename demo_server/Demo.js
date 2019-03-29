/**
 * Created by binbin on 2018/10/14.
 */
let user = require('./User.js');

console.log(`userName:${user.userName}`);
console.log(`${user.sayHello()}`);

let http = require('http');
let url = require('url');
let util = require('util')

http.createServer((req,res)=>{
  res.statusCode == 200;

  res.setHeader("Content-Type","text/plain;charset=utf-8");

  res.end(`url:${util.inspect(url.parse(req.url))}`)
}).listen(3000,'127.0.0.1',()=>{
  console.log(`服务器已开启`)
})
