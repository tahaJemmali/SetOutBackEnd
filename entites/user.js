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
    },
    salt: String,
    address: { "type": String, "default": "Not mentioned" },
    phone : { "type": String, "default": "Not mentioned" },
    photo : { "type": String, "default": "Not mentioned" },
    last_login_date : Date,
    score : Number ,
    birth_date : Date,
    signed_up_with : String,
    sign_up_date : { "type": Date, "default": Date.now },
})

module.exports = mongoose.model('user',userSchema ,'user')