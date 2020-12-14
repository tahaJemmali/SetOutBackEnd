const mongoose =require('mongoose')
const Schema = mongoose.Schema

var commentSchema = Schema({
    user : {
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    text : String,
    comment_date : { "type": Date, "default": Date.now },
})

module.exports = mongoose.model('comment',commentSchema ,'comment')