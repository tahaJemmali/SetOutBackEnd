var PORT = process.env.PORT || 3000;
var express = require('express');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const url = require('./config/urls.json').DataBaseUrl;
////fahd
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
/////§/
var app = express();
app.listen(PORT,()=>{
    console.log('connected to mongodb server, Webserver running on port '+PORT)
})
//app.use(express.json());

const taskRoutes = require('./routes/taskRoutes')
const tagRoutes = require('./routes/tagRoutes')
const projectRoutes = require('./routes/projectRoutes')
const balanceRoutes = require('./routes/balanceRoutes')

var bodyParser = require("body-parser");

///fahd
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
////§/

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true},function (err,client) {
   if (err){
       console.log('Unable to connect to the mongodb server.Error', err);
   }else{

    app.get('/',(req,res) =>{res.send("Welcome to set-out")})
    //tasks
    app.get('/all_tasks/:userid',(req,res) =>{var userid =req.params.userid;taskRoutes.getAllTasksRoute(res,userid)})
    app.post('/add_task',(req,res) =>{taskRoutes.addTaskRoute(req,res)})
    app.delete('/delete_task/:id',(req,res) =>{taskRoutes.deleteTaskRoute(req.params.id,res)})
    app.put('/update_task/:id',(req,res) =>{var reqBody=req.body;var id =req.params.id;taskRoutes.updateTaskRoute(id,reqBody,res)})
    //schedule
    app.get('/all_schedules/:userid',(req,res) =>{var userid =req.params.userid;taskRoutes.getAllSchedules(res,userid)})
    
    //balance
    app.post('/add_balance',(req,res) =>{balanceRoutes.addbalanceRoute(req,res)})
    app.get('/all_balances/:userid',(req,res) =>{var userid =req.params.userid;balanceRoutes.getAllbalancesRoute(res,userid)})
    app.delete('/delete_balance/:id',(req,res) =>{balanceRoutes.deletebalanceRoute(req.params.id,res)})
  
    //project
    app.post('/add_project',(req,res) =>{projectRoutes.addprojectRoute(req,res)})
    app.get('/all_projects/:userid',(req,res) =>{var userid =req.params.userid;projectRoutes.getAllprojectsRoute(res,userid)})
    app.delete('/delete_project/:id',(req,res) =>{projectRoutes.deleteprojectRoute(req.params.id,res)})
    app.put('/update_project/:id',(req,res) =>{var reqBody=req.body;var id =req.params.id;projectRoutes.updateprojectRoute(id,reqBody,res)})

   //tags
   app.post('/add_tag',(req,res) =>{tagRoutes.addTagRoute(req,res)})
   app.get('/all_tags/:userid',(req,res) =>{var userid =req.params.userid;tagRoutes.getAllTagsRoute(res,userid)})
  
  
  
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

       //updateUserBirthDay
app.put('/updateUser',(request,response)=>{userRoutes.UpdateUser(request,response)})

const { Server } = require('ws');
       const wsServer = new Server({ server: app ,maxReceivedFrameSize:1031072,maxReceivedMessageSize:1000 * 1024 * 1024 });

const connections = [];

//wsServer = new SocketServer({httpServer:server,maxReceivedFrameSize:1031072,maxReceivedMessageSize:1000 * 1024 * 1024});

wsServer.on('connection',(req) => {
    //console.log(req);
   // const connection = req;//.accept();
    console.log('new request');
    connections.push(req);

    req.on('message', function(mes) {

        //wss.broadcast(JSON.stringify(test_message));

        /*console.log(mes);
        console.log(mes[1]);
        console.log(mes.post_id);
        console.log(mes["post_id"]);
        console.log(mes[0]["current_user_email"]);*/
        commentRoutes.PostComment(mes);
        connections.forEach(element =>{
            if (element!= req){
                element.send(mes);
            }
        })
    });

    /*wsServer.on('message',(mes)=>{
        console.log(mes);
        commentRoutes.PostComment(mes);
        connections.forEach(element =>{
            if (element!= connection){
                element.sendUTF(mes.utf8Data);
            }
        })
    });*/

    req.on('close',(resCode,des) => {
        console.log('connection closed');
        connections.splice(connections.indexOf(req),1);
    });
});

       //Start Web Server
     /*  app.listen(PORT,()=>{
           console.log('connected to mongodb server, Webserver running on port '+PORT)
       })*/
   }
}
);

