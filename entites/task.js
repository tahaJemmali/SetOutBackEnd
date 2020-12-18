const mongoose =require('mongoose')
const Schema =mongoose.Schema

var taskSchema = Schema({
    taskName: {
        type:String,
        required:true,
        unique: true
    },
    importance: {
        type:Number ,
        required:true
    },
    enjoyment: {
        type:Number ,
        required:true
    },
    dateCreation: {
        type:Date,
        required:true
    },
    note:String,
    deadline:Date,
    reminder:Date,
    endTime:Date,
    schedule:Boolean,
    project:{
        type:Schema.Types.ObjectId,
        ref:"project"  
    },
    tag:{
        type:Schema.Types.ObjectId,
        ref:"tag"  
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"  
    }
})

module.exports = mongoose.model('task',taskSchema,'task')