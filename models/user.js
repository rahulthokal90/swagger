const config = require('config');
//const jwt = require('jsonwebtoken');
const Joi = require('Joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 50
    },
    email : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255
    
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 1024
    },
    isAdmin : Boolean
});


userSchema.method.generateAuthToken = function(){
    
}

function validateUser(user){
    const schema = {
        name : Joi.string()
                .min(2)
                .max(50)
                .required(),
        email : Joi.string()
                .min(2)
                .max(255)
                .required(),
        password : Joi.string()
                .min(5)
                .max(255)
                .required()      
    };

    return Joi.validate(user,schema);

}


const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validate = validateUser;