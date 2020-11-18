const mongoose =require('mongoose')
const Schema =mongoose.Schema

var taskSchema = Schema({
    taskName: {
        type:String,
        required:true
    },
    /*
deadline:{
        type:Date,
        required:true
    },
    note:String,
    reminder:Date,
    application:String,
    importance:Int32,
    repition:Date,
    duree:Int32,
    links:String,
    enjoyment:Int32
    */
})

module.exports = mongoose.model('task',taskSchema,'task')