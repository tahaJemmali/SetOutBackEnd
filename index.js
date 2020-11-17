//Rest api
const express = require('express');
var app = express();
app.use(express.json())
/*var bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));*/
//////////////////////////////////////////////////////

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const url = require('./config/urls.json').DataBaseUrl
const taskRoutes = require('./routes/taskRoutes')

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, function (err) {

    if (err) {
        console.log('ERROR : Enable to connect to the mongoDb server.');
    }
    else {

    //////////////routing 
    //(tasks)
    app.get('/all_tasks',(req,res) =>{taskRoutes.getAllTasksRoute(res)})
    app.post('/add_task',(req,res) =>{taskRoutes.addTaskRoute(req,res)})
    app.delete('/delete_task/:id',(req,res) =>{taskRoutes.deleteTaskRoute(req.params.id,res)})
    app.put('/update_task/:id',(req,res) =>{var reqBody=req.body;var id =req.params.id;taskRoutes.updateTaskRoute(id,reqBody,res)})

    //////////////hosting web service 
    app.listen(3000,()=>{
        console.log('Connected to mongoDb server. WebService running on port 3000');
    })
    }
}
)

