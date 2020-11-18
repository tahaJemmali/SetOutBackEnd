const userSchema = require('../entites/user')

var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var crypto = require('crypto');
//var bodyParser = require("body-parser");

module.exports = {
    Register: async (post_data,plaint_password,firstName,lastName,email,address,phone,response) => {

        var hash_data = saltHashPassword(plaint_password);
        var password = hash_data.passwordHash; // Save password hash
        var salt = hash_data.salt; //save salt

        var user = {
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'password': password,
            'salt': salt,
            'address': address,
            'phone': phone
        };

    await new userSchema(user).save()
        console.log('Registration success');
        response.json('Registration success');
},
    Login:async (response)=> {
        response.json('Login success');
        console.log('Login success');
},
    getAllUsers:async ()=> {
        console.log('get all users !')
        return users = await userSchema.find({})
    },
    getAllUsersByEmail:async (email)=> {
        console.log('get all users by email !');
            return users = await userSchema.find({'email': email}).countDocuments();
    },
    getAllUsersByPhone:async (phone)=> {
        console.log('get all users by phone !');
        try{
            return users = await userSchema.find({'phone': phone});
        }catch (err) {
            return 'error occured';
        }
    }
/*,
deleteTaskById:async (id)=>{
    await taskSchema.findByIdAndDelete(id)
    console.log('task deleted successfully in mongoDB  !')
},
updateTask:async (task,id)=>{
    await taskSchema.findByIdAndUpdate({_id:id},task)
    console.log('task updated successfully in mongoDB !')
}*/

}


var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
};

var sha512 = function (password,salt) {
    var hash = crypto.createHmac('sha512',salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userPassword) {
    var salt = genRandomString(16); // create 16 random character
    var passwordData = sha512(userPassword,salt);
    return passwordData;
}

function checkHashPassword(userPassword,salt) {
    var passwordData = sha512(userPassword,salt);
    return passwordData;
}