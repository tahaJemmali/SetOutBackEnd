const mongoose =require('mongoose')
const Schema =mongoose.Schema

var tagSchema = Schema({
    tagName: {
        type:String,
        required:true,
        unique: true
    },
    color:{
        type:String,
        required:true,
        unique: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"  
    }
})

module.exports = mongoose.model('tag',tagSchema,'tag')