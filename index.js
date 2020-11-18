var express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const url = require('./config/urls.json').DataBaseUrl;
const userRoutes = require('./routes/userRoutes');

var app = express();
app.use(express.json());

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true},function (err,client) {
   if (err){
       console.log('Unable to connect to the mongodb server.Error', err);
   }else{

       //Register | Sing Up
        app.post('/register',(request,response)=>{userRoutes.Register(request,response)});

       //Login
       app.post('/login',(request,response)=>{userRoutes.Login(request,response)});

       //Start Web Server
       app.listen(3000,()=>{
           console.log('connected to mongodb server, Webserver running on port 3000')
       })
   }
});
