var PORT = process.env.PORT || 3000;
var express = require('express');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const url = require('./config/urls.json').DataBaseUrl;
const userRoutes = require('./routes/userRoutes');

var app = express();
app.use(express.json());

const taskRoutes = require('./routes/taskRoutes')
const tagRoutes = require('./routes/tagRoutes')
const projectRoutes = require('./routes/projectRoutes')

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true},function (err,client) {
   if (err){
       console.log('Unable to connect to the mongodb server.Error', err);
   }else{

       //////////////routing 
        //tasks
        app.get('/all_tasks',(req,res) =>{taskRoutes.getAllTasksRoute(res)})
        app.post('/add_task',(req,res) =>{taskRoutes.addTaskRoute(req,res)})
        app.delete('/delete_task/:id',(req,res) =>{taskRoutes.deleteTaskRoute(req.params.id,res)})
        app.put('/update_task/:id',(req,res) =>{var reqBody=req.body;var id =req.params.id;taskRoutes.updateTaskRoute(id,reqBody,res)})
        //schedule
        app.get('/all_schedules',(req,res) =>{taskRoutes.getAllSchedules(res)})

        //project
        app.post('/add_project',(req,res) =>{projectRoutes.addprojectRoute(req,res)})


       //Register | Sing Up
        app.post('/register/:firstName/:lastName/:email/:password/:address/:phone',(request,response)=>{userRoutes.Register(request,response)});

       //Login
       app.post('/login/:email/:password',(request,response)=>{userRoutes.Login(request,response)});

       //GetUser
       app.get('/getUser/:email',(request,response)=>{/*request._custom = request.get('email');*/var email=request.params.email;userRoutes.GetUser(email,request,response)});

       //updateUserEmail
       app.put('/updateUserEmail/:oldEmail/:newEmail/:password',(request,response)=>{userRoutes.UpdateUserEmail(request,response)});

       //LoginWithFacebook
       app.post('/LoginWithFacebook/:firstName/:lastName/:email/:signedUpWith/:birthDate/:photo',(request,response)=>{userRoutes.LoginWithFacebook(request,response)});


       //Start Web Server
       app.listen(PORT,()=>{
           console.log('connected to mongodb server, Webserver running on port '+PORT)
       })
   }
});

