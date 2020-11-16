const mongoose =require('mongoose')

const taskSchema = mongoose.Schema({
    taskName: String
})

module.exports = mongoose.model('task',taskSchema,'task')