var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on("connected",function () {
  console.log("MongoDB connected success");
});

mongoose.connection.on("error",function () {
  console.log("MongoDB connected fail");
});

mongoose.connection.on("disconnected",function () {
  console.log("MongoDB connected disconnected.");
});

//查询商品列表数据
router.get("/list",function(req,res,next){
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel");
  let sort = req.param("sort");
  let skip = (page-1)*pageSize;
  let priceGt = '',priceLte = '';
  let params = {};
  if(priceLevel!='all'){
    switch(priceLevel){
      case '0':priceGt=0;priceLte=100;break;
      case '1':priceGt=100;priceLte=500;break;
      case '2':priceGt=500;priceLte=1000;break;
      case '3':priceGt=1000;priceLte=5000;break;
    }
    params = {
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
      }
    }
  }

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({"salePrice":sort});
  goodsModel.exec(function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
});

//加入到购物车
router.post("/addCart",function(req,res,next){
  let userId = '100000077',productId = req.body.productId;
  let User = require('../models/user');
  User.findOne({userId:userId},(err,userDoc)=>{
    if(err){
      console.log(44044);
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
      console.log(33033);
      // console.log("userDoc:"+userDoc);
      if(userDoc){
        let goodsItem = "";
        userDoc.cartList.forEach(function (item) {
          if(item.productId == productId){
            goodsItem = item;
            item.productNum++;
          }
        });
        if(goodsItem){
          userDoc.save(function (err2,doc2) {
            if(err2){
              // console.log(66066);
              res.json({
                status:"1",
                msg:err2.message
              })
            }else{
              // console.log(77077+doc2);
              res.json({
                status:'0',
                msg:'',
                result:'suc'
              })
            }
          })
        }else{
          Goods.findOne({productId:productId},(err1,doc)=>{
            if(err1){
              // console.log(22022);
              res.json({
                status:"1",
                msg:err1.message
              })
            }else{
              if(doc){
                // console.log(11011);
                doc.productNum=1;
                doc.checked="1";
                // console.log(88088);
                userDoc.cartList.push(doc);
                // console.log(55055+doc);
                userDoc.save(function (err2,doc2) {
                  if(err2){
                    console.log(66066);
                    res.json({
                      status:"1",
                      msg:err2.message
                    })
                  }else{
                    console.log(77077);
                    res.json({
                      status:'0',
                      msg:'',
                      result:'suc'
                    })
                  }
                })
              }
            }
          })
        }

      }
    }
  })
});

module.exports = router;
