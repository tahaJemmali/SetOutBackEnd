const userService = require('../modules/user_module')
//var mongodb = require('mongodb');
//var ObjectID = mongodb.ObjectID;
var crypto = require('crypto');
//var bodyParser = require("body-parser");

module.exports = {

//register
    Register : (request,response) => {
        var post_data = request.body;
        //console.log("DATA POST :"+post_data);
        var plaint_password = post_data.password;
        var firstName = post_data.firstName;
        var lastName = post_data.lastName;
        var email = post_data.email;
        var address = post_data.address;
        var phone = post_data.phone;

       // console.log('password : '+plaint_password);
       // console.log('Email : '+ email);

        userService.getAllUsers().then(function (result) {
            //console.log(result);
            var allowInsert = true;
            result.forEach((user) => {
                if(allowInsert){
                console.log(user.email);
                if (user.email == email){
                    allowInsert=false;
                    //response.status(404).json( 'Email already exists' );
                    response.json('Email already exists');
                    console.log('Email already exists');

                }

                if(user.phone != ""){
                if(user.phone == phone && allowInsert) {
                    allowInsert=false;
                    //response.status(404).json( 'Phone number already exists' );
                    response.json('Phone number already exists');
                    console.log('Phone number already exists');
                }}
            }
            }
            );
            if (allowInsert){
                userService.Register(post_data,plaint_password,firstName,lastName,email,address,phone,response);
            }
        });


        /*userService.getAllUsersByEmail(email).then(function (result) {
            console.log(result);
            if (result!=0){
                allowInsert=false;
                //response.json('Email already exists');
                console.log('Email already exists');
                //return ;
            }else{
                userService.Register(post_data,plaint_password,firstName,lastName,email,address,phone);
            }
        });*/

        /*userService.getAllUsersByPhone(phone).then(function (result) {
            console.log(result);
            if (result!=0){
                allowInsert=false;
                response.json('Phone number already exists');
                console.log('Phone number already exists');
                return ;
            }
        });*/

        /*console.log('le test '+allowInsert);
        if (allowInsert){
        }*/
    },

    Login : (request,response) => {

    var post_data = request.body;
    var email = post_data.email;
    var userPassword = post_data.password;

    //Check if email and password exists
        userService.getAllUsers().then(function (result) {
            var validEmail = false;
            var allowLogin = false;
            var pwd = "";
            var slt ="";
            result.forEach((user) => {
                    if(!validEmail){
                        console.log(user.email);
                        if (user.email == email){
                            validEmail=true;
                            pwd=user.password;
                            slt = user.salt;
                        }
                    }
                });

                if (!validEmail){
                    response.json('Email does not exist');
                    console.log('Email does not exist');
                }else{
                    var hashed_password = checkHashPassword(userPassword,slt).passwordHash; // Hash password with salt
                    var encrypted_password = pwd; // get password from user
                    if (hashed_password == encrypted_password){

                        allowLogin=true;
                    }else{
                        response.json('Wrong password');
                        console.log('Wrong password');
                    }
                }
            if (allowLogin){
                userService.Login(response);
            }
        });
    }
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











