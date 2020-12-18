const mongoose =require('mongoose')
const Schema =mongoose.Schema

var balanceSchema = Schema({
    balanceName: {
        type:String,
        required:true
    },
    balanceAmount: {
        type:Number,
        required:true
    },
    dateCreation: {
        type:Date,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"  
    }
})


module.exports = mongoose.model('balance',balanceSchema,'balance')

