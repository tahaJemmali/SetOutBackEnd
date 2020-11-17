const taskServie = require('../modules/task_module')


module.exports = {
//get all tasks 
    getAllTasksRoute:(res) =>{
    taskServie.getAllTasks().then(function (result) {
    res.status(200).json({
        message:"all tasks",
        tasks:result})
    })
},
//add tak
    addTaskRoute:(req,res)=>{
        var task = {
            taskName:req.body.taskName
        }
        try{
            taskServie.addTask(task)
            res.status(201).json("task created successfully !")
        } catch(error){
            console.log(error)
        }
        
    },
//delete task route
    deleteTaskRoute: (id,res)=>{
        try {
            taskServie.deleteTaskById(id)
            res.status(200).json("task deleted successfully !")
        } catch (error) {
            console.log(error)
        }
    },
//update task route
    updateTaskRoute:(id,reqBody,res)=>{
        try {
         /*   var task ={
                taskName:reqBody.taskName
            }*/
            taskServie.updateTask(reqBody,id)
            res.status(200).json("task updated successfully !")
        } catch (error) {
            console.log(error)
        }
    }
}

