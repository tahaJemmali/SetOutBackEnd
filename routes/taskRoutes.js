const taskServie = require('../modules/task_module')

module.exports = {
//get all tasks 
    getAllTasksRoute:(res) =>{
    taskServie.getAllTasks().then(function (result) {
    res.status(200).json({
        message:"all tasks",
        tasks:result})
    })
},//get all schedules 
getAllSchedules:(res) =>{
taskServie.getAllSchedules().then(function (result) {
res.status(200).json({
    message:"all schedules",
    tasks:result})
})
},
//add tak
    addTaskRoute:(req,res)=>{
        var task = {
            taskName:req.body.taskName,
            importance:req.body.importance,
            enjoyment:req.body.enjoyment,
            note:req.body.note,
            dateCreation:req.body.dateCreation,
            deadline:req.body.deadline,
            reminder:req.body.reminder,
            startTime:req.body.startTime,
            endTime:req.body.endTime,
            schedule:req.body.schedule
        }
        taskServie.addTask(task,res)
        
    },
//delete task route
    deleteTaskRoute: (id,res)=>{
        try {
            taskServie.deleteTaskById(id,res)
        } catch (error) {
            console.log(error)
        }
    },
//update task route
    updateTaskRoute:(id,reqBody,res)=>{
        try {
            taskServie.updateTask(reqBody,id)
            res.status(200).json("task updated successfully !")
        } catch (error) {
            console.log(error)
        }
    }
}

