var PORT = process.env.PORT || 3000;
var express = require('express');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const url = require('./config/urls.json').DataBaseUrl;

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

var app = express();
//app.use(express.json());
////
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


const taskRoutes = require('./routes/taskRoutes')
const tagRoutes = require('./routes/tagRoutes')
const projectRoutes = require('./routes/projectRoutes')
const balanceRoutes = require('./routes/balanceRoutes')


var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/*console.log(new Date('en-US', {
    timeZone: 'Europe/Amsterdam'
  }))
*/

//console.log(Date.now())

//ws
//const server = require('websocket').server;
//const http = require('http').createServer(app);
//const server = http.createServer((req,res) => {});

/*
const server = require('http').createServer(app)
const WebSocket = require('ws');
const wsServer = new WebSocket.Server({server});
*/


mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true},function (err,client) {
   if (err){
       console.log('Unable to connect to the mongodb server.Error', err);
   }else{
  //////////////routing 
  app.get('/',(req,res) =>{res.send("Welcome to set-out")})
  //tasks
  app.get('/all_tasks',(req,res) =>{taskRoutes.getAllTasksRoute(res)})
  app.post('/add_task',(req,res) =>{taskRoutes.addTaskRoute(req,res)})
  app.delete('/delete_task/:id',(req,res) =>{taskRoutes.deleteTaskRoute(req.params.id,res)})
  app.put('/update_task/:id',(req,res) =>{var reqBody=req.body;var id =req.params.id;taskRoutes.updateTaskRoute(id,reqBody,res)})
  //schedule
  app.get('/all_schedules',(req,res) =>{taskRoutes.getAllSchedules(res)})
  
  //balance
  app.post('/add_balance',(req,res) =>{balanceRoutes.addbalanceRoute(req,res)})
  app.get('/all_balances',(req,res) =>{balanceRoutes.getAllbalancesRoute(res)})
  app.delete('/delete_balance/:id',(req,res) =>{balanceRoutes.deletebalanceRoute(req.params.id,res)})

  //project
  app.post('/add_project',(req,res) =>{projectRoutes.addprojectRoute(req,res)})
  app.get('/all_projects',(req,res) =>{projectRoutes.getAllprojectsRoute(res)})
  app.delete('/delete_project/:id',(req,res) =>{projectRoutes.deleteprojectRoute(req.params.id,res)})

 //tags
 app.post('/add_tag',(req,res) =>{tagRoutes.addTagRoute(req,res)})
 app.get('/all_tags',(req,res) =>{tagRoutes.getAllTagsRoute(res)})



 //Register | Sing Up
  app.post('/register',(request,response)=>{userRoutes.Register(request,response)})

 //Login
 app.post('/login',(request,response)=>{userRoutes.Login(request,response)})

 //GetUser
 app.get('/getUser/:email',(request,response)=>{var email=request.params.email;userRoutes.GetUser(email,request,response)})

 //passwordRecovery
 app.post('/passwordRecovery',(request,response)=>{userRoutes.GetRecoveryCode(request,response)})

 //passwordReset
 app.put('/passwordReset',(request,response)=>{userRoutes.ResetPassword(request,response)})


 //updateUserEmail
 app.put('/updateUserEmail',(request,response)=>{userRoutes.UpdateUserEmail(request,response)})

 //LoginWithFacebook
 app.post('/LoginWithFacebook',(request,response)=>{userRoutes.LoginWithFacebook(request,response)})

 //addPost
 app.post('/addPost',(request,response)=>{postRoutes.AddPost(request,response)})

 //getPosts
 app.get('/getPosts',(request,response)=>{postRoutes.GetPosts(request,response)})

 //likePost
 app.put('/likePost',(request,response)=>{postRoutes.LikePost(request,response)})

  //unListPost
  app.put('/unLikePost',(request,response)=>{postRoutes.UnLikePost(request,response)})

  //getComments
  app.get('/getComments/:post_id',(request,response)=>{var post_id=request.params.post_id;postRoutes.GetComments(post_id,request,response)})

//updateUserPhoto
app.put('/updateUserPhoto',(request,response)=>{userRoutes.UpdateUserPhoto(request,response)})

       const SocketServer = require('websocket').server;
       const server = require('http').createServer((req,res)=>{});
       
       server.listen(3001  ,()=>{
           console.log('connected to websocket server port 3001');
       });

       const connections = [];
       wsServer = new SocketServer({httpServer:server,limit: "50mb", parameterLimit:500000,
       extended:true,maxHttpBufferSize: 10000000,maxTextMessageSize: 10000000,
       bufferSizeLimit:1000000,maxBufferSizeLimit:1000000,maxReceivedMessageSize:100000,maxReceivedFrameSize:100000});

       wsServer.on('request',(req) => {
           const connection = req.accept();
           console.log('new request');
           connections.push(connection);
           connection.on('message',(mes)=>{
               console.log(mes);
               commentRoutes.PostComment(mes);
               connections.forEach(element =>{
                   if (element!= connection){
                       element.sendUTF(mes.utf8Data);
                   }
               })
           });
           connection.on('close',(resCode,des) => {
               console.log('connection closed');
               connections.splice(connections.indexOf(connection),1);
           });
       });

     
       //Start Web Server
       app.listen(PORT,()=>{
           console.log('connected to mongodb server, Webserver running on port '+ PORT)
       })


   }
});

