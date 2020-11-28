const userSchema = require('../entites/user')

var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var crypto = require('crypto');
//var bodyParser = require("body-parser");

module.exports = {
    Register: async (plaint_password,firstName,lastName,email,address,phone,response) => {

        var hash_data = saltHashPassword(plaint_password);
        var password = hash_data.passwordHash; // Save password hash
        var salt = hash_data.salt; //save salt

       // var date = new Date(2014, 11, 12, 14, 12);
        //var date = new ISODate("2014-12-11T14:12:00Z");
        //var date = new Date("2014-12-11T14:12:00Z");

        var user = {
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'password': password,
            'salt': salt,
            'address': address,
            'phone': phone,
            'score' : 0,
            'signed_up_with': "Set Out - Life account"
            //'signed_up_date' : date
        };

    await new userSchema(user).save()
        console.log('Registration success');
        response.status(200).json({message:"Registration success"});
        //response.json('Registration success');
},
    Login:async (response)=> {
        //response.json('Login success');
        response.status(200).json({message:"Login success"});
        console.log('Login success');
},
    getAllUsers:async ()=> {
        //console.log('get all users !')
        return users = await userSchema.find({})
    },
    getAllUsersByEmail:async (email)=> {
        //console.log('get all users by email !');
            return users = await userSchema.find({'email': email}).countDocuments();
    },
    getAllUsersByPhone:async (phone)=> {
        //console.log('get all users by phone !');
        try{
            return users = await userSchema.find({'phone': phone});
        }catch (err) {
            return 'error occured';
        }
    },getUserByEmail:async (email)=> {
        //console.log('get user by email !');
        return user = await userSchema.find({'email': email});
    },
    updateUser:async (user,id)=>{
        await userSchema.findByIdAndUpdate({_id:id},user)
        console.log('user updated successfully in mongoDB !')
    },RegisterFb: async (first_name,last_name,email,signed_up_with,birth_date,photo) => {
        var user = {
            'firstName': first_name,
            'lastName': last_name,
            'email': email,
            'score' : 0,
            'signed_up_with': signed_up_with,
            'birth_date': birth_date,
            'photo':photo
        };

        await new userSchema(user).save()

    }
/*,
deleteTaskById:async (id)=>{
    await taskSchema.findByIdAndDelete(id)
    console.log('task deleted successfully in mongoDB  !')
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