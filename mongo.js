const { request } = require("express");

const mongoose = require('mongoose')
const url = 'mongodb+srv://taha:1234@cluster0.lopuo.mongodb.net/setoutDB';

module.exports = async () =>{
    await mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    return mongoose
} 