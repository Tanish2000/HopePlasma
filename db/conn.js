const mongoose = require('mongoose');

const DB = process.env.DATABASE;

// Database Connection
mongoose.connect(DB,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : false 
 }).then(()=> {
     console.log("Connection Successfull");
 }).catch((err) => console.log("Connection failed to Database\nError: " ,err.message));