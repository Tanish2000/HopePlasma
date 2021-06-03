const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');


dotenv.config({path: './config.env'}); //getting all the private data

require('./db/conn') //Database Connection


app.use(express.json());  //Converting Response to JSON

app.use(require('./Router/auth'));  //Making all the routes

const PORT = process.env.PORT || 5000; // Port number


if( process.env.NODE_ENV=="production")
{
    app.use(express.static("client/build"));    
    app.get("*" , (req,res)=> {
        res.sendFile(path.resolve(__dirname , 'client' ,'build' , 'index.html'))
    })
}

//Listener
app.listen(PORT , ()=>{
    console.log(`Backend Server running on Port ${PORT}`);
})

