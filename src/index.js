var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokenss
const TokenData = require('../schemas/schema');
const cron = require('node-cron');
const {
    secret
  } = require('../config');
  cron.schedule('* * * * *', async () => {
    try {
      
        let result=await TokenData.deleteMany( { timeStamp : {"$lt" : new Date(Date.now() -60) } });
        console.log("result",result);
    } catch (error) {
        console.log("error",error);
    }
});
exports.getToken = async (req, res, next) => {
  try {
    const userId=req.body.userId;
    if (!userId || userId === "" || userId === undefined) {
      res.send({success:false,Result:"Please provide wallet id"})
    }else{
      var token = jwt.sign({
        id: userId
      }, secret, {
        expiresIn: 86400 // expires in 24 hours
      });
     res.send({success:true,token:token})
    }
   
  } catch (error) {
    console.log(error);
    res.send({success:false})
  }
};
exports.getDetails = async (req, res, next) => {
    try {
    const userId=req.body.userId;
    if (!userId || userId === "" || userId === undefined) {
        res.send({success:false,Result:"Please provide wallet id"})
      }else{
        let data = await TokenData.find({userId});
        if(data.length){
            res.send({success:true,result:"User have NFT"})
        }else{
            res.send({success:true,result:"User Don't have NFT"})
        }
      }
      
    } catch (error) {
      console.log(error);
      res.send({success:false})
    }
  };
  exports.insertWalletId = async (req, res, next) => {
    try {
      const {
          tokenId,
          userId
      }=req.body;
      const time=Date.now();
      if (!userId || userId === "" || userId === undefined) {
        res.send({success:false,Result:"Please provide wallet id"})
      }else if(!tokenId || tokenId === "" || tokenId === undefined){
        res.send({success:false,Result:"Please provide token id"})
      }else{
        const data={
            timeStamp:time,
            tokenId,
            userId
        }
        console.log("data",data);
        let tokenData = await new TokenData(data);
        tokenData.save();
        res.send({success:true,result:"Data saved Successfully!"})
      }
    } catch (error) {
      console.log(error);
      res.send({success:false})
    }
  };