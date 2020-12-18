const mongoose =require('mongoose')
const Schema =mongoose.Schema

var projectSchema = Schema({
    projectName: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },  
    dateCreation: {
        type:Date,
        required:true
    },
   tasks:[{
    type:Schema.Types.ObjectId,
    ref:"task"
}],
tag:{
    type:Schema.Types.ObjectId,
    ref:"tag"  
},
user:{
    type:Schema.Types.ObjectId,
    ref:"user"  
}
})

module.exports = mongoose.model('project',projectSchema,'project')