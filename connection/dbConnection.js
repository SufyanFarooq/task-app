const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');

// const URL="mongodb+srv://blockchainuser:blockchainuser2580@cluster0.yq58x.mongodb.net/blockchain?retryWrites=true&w=majority&ssl=true"
const URL="mongodb+srv://blockchainuser:blockchainuser2580@cluster0.yq58x.mongodb.net/blockchain?retryWrites=true&w=majority"
const Connection= async()=>{
    
    
    try{
        await mongoose.connect(URL,{
   useNewUrlParser: true, 
   useUnifiedTopology: true 
        })
        console.log("Database connected successfully")
    }catch(error){
        console.log("Error while connectiog MongoDb", error)
    }
}

module.exports=Connection