const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password

    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg:'Failed to register user'});
        } else {
            res.json({success: true, msg:'User registered'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err,user) => {
        if(err) throw err;
        if (!user){
            return res.json ( {success: false, msg:' User not found!'})
        }
        User.comparePassword(password, user.password, (err,isMatch)=> {
            if (err) throw err;
            if (isMatch){
                const token = jwt.sign(user,config.secret ,{
                    expiresIn: 604800 // expires in 1 week
                });
                res.json({
                    success:true,
                    token:'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.username,
                        email: user.email,
                    }
                })
            }
            else {
                return res.json ( {success: false, msg:' Wrong password!'})

            }
        });
    })
});


// Profile
router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res, next) => {
    res.json({user:req.user});
});


// All users JSONs - for dashboard table
router.get('/userslist', passport.authenticate('jwt',{session:false}), (req, res, next) => {
    User.getAllUsers((err, users) => {
        if (err) {
           res.json({success: false, message: 'problem has occured'});
        }
        else {
             res.json({users,success: true, msg:'Success to fetch all users'});

        }
    });
});

router.post('/delete',(req,res,next) => {
    console.log("In Delete");

    let newUser = new User({
        _id:  req.body._id,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        username: req.body.username,
    });
    console.log(newUser);
    User.deleteUser(newUser,function(err,callback){
        if(err){
            //console.log(callback);
            res.json({success: false, msg:'Failed to Delete user'});
        }else{
            console.log("inSuccess- server side!!!!");
            res.json({success:true, msg:'Success To delete user '});
        }
    });
});






module.exports = router;
