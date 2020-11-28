const mongoose =require('mongoose')
const Schema =mongoose.Schema

var balanceSchema = Schema({
    balanceName: {
        type:String,
        required:true
    },
    amount: {
        type:Double,
        required:true
    },
    dateCreation: {
        type:Date,
        required:true
    },
    type: {
        type:String,
        required:true
    }
})

module.exports = mongoose.model('balance',projectSchema,'balance')