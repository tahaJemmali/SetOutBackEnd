const mongoose =require('mongoose')
const Schema = mongoose.Schema

var userSchema = Schema({
    firstName : String,
    lastName: String,
    email : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    salt: String,
    address: String,
    phone : String,
    lastLogin :String
})

module.exports = mongoose.model('user',userSchema ,'user')