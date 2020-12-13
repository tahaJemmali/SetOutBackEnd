const mongoose =require('mongoose')
const Schema = mongoose.Schema

var  user = mongoose.model('user')

var postSchema = Schema({
    title : String,
    description: String,
    image : String,
    post_date : { "type": Date, "default": Date.now },
    comments :[{
        type:Schema.Types.ObjectId,
        ref:"comment"
    }],
    likedBy : [{
        type:Schema.Types.ObjectId,
        ref:"user"
    }],
    postedBy : {
        type:Schema.Types.ObjectId,
        ref:"user"
    },
})

module.exports = mongoose.model('post',postSchema ,'post')