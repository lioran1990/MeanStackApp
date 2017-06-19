const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword,hash, (err,isMatch)=>{
        if(err) throw err;
            callback(null,isMatch);
    });
}

/*
module.exports.getAllUsers = function(callback){
    console.log(("in get all users profiles"))
    User.find(function (err,users) {
        console.log("in find")
        if(err){
            console.log("Cant find ");
            callback(false,users);
        }  else {
            console.log("users found");
            console.log(users);
             callback(false,users);
        }
    });
}
*/

module.exports.getAllUsers = function(err,callback){
    User.find(err,callback)
}

module.exports.deleteUser = function(user, callback){

    User.remove({_id:user.serialNumber},function (err,callback) {
        if(err){
            console.log('error');
        }else {
            return callback;
        }
    });
    return callback(false,null);
}







