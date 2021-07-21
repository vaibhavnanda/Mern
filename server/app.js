const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser()) ;

dotenv.config({path: './config.env'});

require('./db/conn');
// const User = require('./model.userSchema');
 
app.use(express.json()); // We're getting data in json, so this is used to convert json data to js obkect

app.use(require('./router/auth'));



// app.get('/about',(req,res) =>{
//     res.send(`Hello`);
// });

// app.get('/signin',(req,res) =>{
//     res.send(`Hello`);
// });

app.get('/signup',(req,res) =>{
    res.send(`Hello`);
});

// app.get('/contact',(req,res) =>{
//     res.send(`Hello`);
// });

app.listen(process.env.PORT,() =>{
    console.log(`Running`);
});