const e = require('express')
const projectSchema = require('../entites/project');
const taskServie = require('../modules/task_module')
var resMsg = {
    message:String
}
module.exports = {
    addproject: async (req,res) => {

        try {
            req.body.tasks.forEach(task =>{
                task.schedule = false
                taskServie.updateTask(task,task.id)
            } );
            await new projectSchema(req.body).save()
            resMsg.message="project added successfully in mongoDB  !"
            console.log('project added successfully in mongoDB  !')
            res.status(201).json(resMsg)
        } catch (error) {
            console.log(error.message)
            resMsg.message=error.message
            res.status(404).json(resMsg)
        }
},
getAllprojects:async ()=> {
    console.log('get all projects !')
    return projects= await projectSchema.find({}).populate("tasks").populate("tag")
},
getAllSchedules:async ()=> {
    return projects= await projectSchema.find({schedule:true})
},

deleteprojectById:async (id,res)=>{
    try {
        await projectSchema.findByIdAndDelete(id)
        resMsg.message="project deleted successfully in mongoDB  !"
        res.status(201).json(resMsg)
    } catch (error) {
        console.log(error.message)
        resMsg.message=error.message
        res.status(404).json(resMsg)
    }
    
    console.log('project deleted successfully in mongoDB !')
},
updateproject:async (project,id)=>{
    try {
        await projectSchema.findByIdAndUpdate({_id:id},project)
        resMsg.message="project updated successfully in mongoDB !"
        res.status(201).json(resMsg)
    } catch (error) {
        console.log(error.message)
        resMsg.message=error.message
        res.status(404).json(resMsg)
    }
 
}
}