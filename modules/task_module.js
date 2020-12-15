const e = require('express')
const taskSchema = require('../entites/task')
var resMsg = {
    message:String
}
module.exports = {
    addTask: async (task,res) => {

        try {
            await new taskSchema(task).save(function(err,t) {
                console.log(t.id);
                resMsg.message=t.id
                console.log('task added successfully in mongoDB  !')
                res.status(201).json(resMsg)
             });
            
        } catch (error) {
            console.log(error.message)
            resMsg.message=error.message
            res.status(404).json(resMsg)
        }
},
getAllTasks:async ()=> {
    console.log('get all tasks !')
    return tasks= await taskSchema.find()
},
getAllSchedules:async ()=> {
    return tasks= await taskSchema.find({schedule:true})
},
deleteTaskById:async (id,res)=>{
    try {
        await taskSchema.findByIdAndDelete(id)
        resMsg.message="task deleted successfully in mongoDB  !"
        console.log('task deleted successfully in mongoDB !')
        res.status(201).json(resMsg)
    } catch (error) {
        console.log(error.message)
        resMsg.message=error.message
        res.status(404).json(resMsg)
    }
   
   
},
updateTask:async (task,id)=>{
    await taskSchema.findByIdAndUpdate({_id:id},task)
    console.log('task updated successfully in mongoDB !')
},
}