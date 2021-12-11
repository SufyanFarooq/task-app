const mongoose = require("mongoose");

const tokenschema= mongoose.Schema({
    timeStamp:{
        type:Date,
        required:true,
        unique:true
    },
    tokenId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
});
let TokenData= mongoose.model("tokenData", tokenschema)
module.exports=TokenData;