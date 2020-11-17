const taskSchema = require('../entites/task')

module.exports = {
    addTask: async (task) => {
    await new taskSchema(task).save()
    console.log('task added successfully in mongoDB  !')
},
getAllTasks:async ()=> {
    console.log('get all tasks !')
    return tasks= await taskSchema.find({}) 
},
deleteTaskById:async (id)=>{
    await taskSchema.findByIdAndDelete(id)
    console.log('task deleted successfully in mongoDB  !')
},
updateTask:async (task,id)=>{
    await taskSchema.findByIdAndUpdate({_id:id},task)
    console.log('task updated successfully in mongoDB !')
}
}