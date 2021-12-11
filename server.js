const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
const userRoutes = require('./src/routes');
const Connection = require("./connection/dbConnection");

//@info all routes
app.use(express.json());
app.use('/api/users', userRoutes);
//port at which server running
var PORT = process.env.PORT || 5000;
//@info server listening
// app.get("/api/users",(req,res)=>{
// res.send("api ok")
// })
var server = app.listen(PORT, () => {
    Connection()
    console.log("Server is listening on port::", PORT);
})
//@info server will be closed in case of any unhandledRejection
process.on('unhandledRejection', error => {
    console.log(error.message);
    server.close(() => process.exit(1));
});