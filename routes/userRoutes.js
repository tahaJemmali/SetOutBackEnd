const userService = require('../modules/user_module')
//var mongodb = require('mongodb');
//var ObjectID = mongodb.ObjectID;
var crypto = require('crypto');
//var bodyParser = require("body-parser");

module.exports = {

//register
    Register : (request,response) => {
        //var post_data = request.body;
        //console.log("DATA POST :"+post_data);

        /*var plaint_password = post_data.password;
        var firstName = post_data.firstName;
        var lastName = post_data.lastName;
        var email = post_data.email;
        var address = post_data.address;
        var phone = post_data.phone;*/

        var plaint_password = request.params.password;
        var firstName = request.params.firstName;
        var lastName = request.params.lastName;
        var email = request.params.email;
        var address = request.params.address;
        var phone = request.params.phone;


        console.log(request.params)

       // console.log('password : '+plaint_password);
       // console.log('Email : '+ email);

        userService.getAllUsers().then(function (result) {
            //console.log(result);
            var allowInsert = true;
            result.forEach((user) => {
                if(allowInsert){
                //console.log(user.email);
                if (user.email == email){
                    allowInsert=false;
                    //response.status(404).json( 'Email already exists' );
                    response.status(200).json({message:"Email already exists"});
                    //response.json('Email already exists');
                    //console.log('Email already exists');

                }

                if(user.phone != "Not mentioned"){
                if(user.phone == phone && allowInsert) {
                    allowInsert=false;
                    //response.status(404).json( 'Phone number already exists' );
                    response.status(200).json({message:"Phone number already exists"});
                    //response.json('Phone number already exists');
                    //console.log('Phone number already exists');
                }}
            }
            }
            );
            if (allowInsert){
                userService.Register(plaint_password,firstName,lastName,email,address,phone,response);
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
    //var email = post_data.email;
    //var userPassword = post_data.password;

    var email = request.params.email;
    var userPassword = request.params.password;


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
                    response.status(200).json({message:"Email does not exist"});
                    //response.json('Email does not exist');
                    //console.log('Email does not exist');
                }else{
                    var hashed_password = checkHashPassword(userPassword,slt).passwordHash; // Hash password with salt
                    var encrypted_password = pwd; // get password from user
                    if (hashed_password == encrypted_password){

                        allowLogin=true;
                    }else{
                        //response.json('Wrong password');
                        response.status(200).json({message:"Wrong password"});
                        //console.log('Wrong password');
                    }
                }
            if (allowLogin){
                // var user = userService.getUserByEmail(email)
                userService.Login(response);
            }
        });
    },
    /*GetUser : (request,response) => {

       // var post_data = request.body;
       // var email = post_data.email;

        userService.getUserByEmail(request.body.email);
    },*/
    //get user
    GetUser:(email,request,response) =>{
        userService.getUserByEmail(/*request.body.email*/email).then(function (result) {
            response.status(200).json({
                message:"user =)",
                user:result})
        })
    },
    //updateUserEmail
    UpdateUserEmail:(request,response) =>{

        var reqBody = request.body;

        var old_email = request.params.oldEmail;
        var new_email = request.params.newEmail;
        var password = request.params.password;

        console.log('here 1 ');
        console.log(old_email);
        console.log(new_email);
        console.log(password);
        console.log('here 2 ');

        userService.getAllUsers().then(function (result) {

            var validOldEmail = false;
            var validNewEmail = true;
            var allowUpdate = false;
            var pwd = "";
            var slt ="";
            var current_user;

            //1 S
            /*if (old_email == new_email){
                response.status(200).json({message:"Email already exists"});
                console.log("Email already exists");
            }*/

            result.forEach((user) => {
                if(!validOldEmail){
                    //console.log(user.email);
                    if (user.email == old_email){
                        validOldEmail=true;
                        pwd=user.password;
                        slt = user.salt;
                        current_user = user;
                    }
                }
            });

            //2 S
            if (!validOldEmail){ // never going to heppend
                //response.status(200).json({message:"User does not exist"}); //return this after update in bdd done
                response.status(200).json({message:"User does not exist"});
                console.log("User does not exist")
            }

            var i = 0;
            result.forEach((user) => {
                if(validNewEmail){
                    //console.log(user.email);
                    if (user.email == new_email && new_email!=old_email){
                        validNewEmail=false;
                    }
                }
            });

            if (validNewEmail && validOldEmail){
                //response.status(200).json({message:"Email already exists"});
                //console.log("Email already exists");
                //return;
                var hashed_password = checkHashPassword(password, slt).passwordHash; // Hash password with salt
                var encrypted_password = pwd; // get password from user
                if (hashed_password == encrypted_password) {
                    allowUpdate = true;
                } else {
                    response.status(200).json({message: "Wrong password"});
                    console.log("Wrong password");
                }
            }else{
                response.status(200).json({message:"Email already exists"});
                console.log("Email already exists");
            }
            //if (!validEmail){
                //response.json('Email does not exist');
                //console.log('Email does not exist');

            //}
            //else{

            //}
            if (allowUpdate && validNewEmail && validOldEmail){
                response.status(200).json({message:"Email updated"});
                console.log("Email updated");
                current_user.email = new_email;
                userService.updateUser(current_user,current_user.id);
                // var user = userService.getUserByEmail(email)
                //userService.Login(response);
            }
        });



    },LoginWithFacebook:(request,response) =>{

        var reqBody = request.body;

        var first_name = request.params.firstName;
        var last_name = request.params.lastName;
        var email = request.params.email;
        var signed_up_with = request.params.signedUpWith;
        var birth_date = request.params.birthDate;
        var photo = request.params.photo;


        console.log('FACEBOOK XD');
        console.log(first_name);
        console.log(last_name);
        console.log(email);
        console.log(signed_up_with);
        console.log(birth_date);
        console.log(photo);
        console.log('FACEBOOK XD');

        userService.getAllUsers().then(function (result) {
            var fbAccountExist = false;

            result.forEach((user) => {
                if(!fbAccountExist){
                    if (user.email == email){
                        fbAccountExist=true;
                    }
                }
            });

            if (fbAccountExist){
                response.status(200).json({message:"Registred with facebook already"});
                console.log("Registred with facebook already");
            }else{
                console.log('new facebook account');
                response.status(200).json({message:"new facebook account"});
                userService.RegisterFb(first_name,last_name,email,signed_up_with,birth_date,photo);

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











