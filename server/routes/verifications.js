const express = require("express");
const router = require("express").Router();
const app = express();
const User = require("../models/User");
const Token = require("../models/Token");
var email = require('../utility/mailer');
const crypto = require('crypto');

//confirm account by email
router.get('/verified', function (req, res, next) {
    console.log("Verification: verified");    
});

app.get('/confirmation/:email/:token', function (req, res, next) {

    console.log("Verification: veri api req");

    Token.findOne({ token: req.params.token }, function (err, token) {

        // token is not found into database i.e. token may have expired 
        if (err){
            console.log("Verification: token not found");
            res.status(400).json({msg:'Your verification link may have expired. Please click on resend for verify your Email.'});
        }
        // if token is found then check valid user 
        else{
            console.log("Verification: token found");

            User.findOne({ _id: token._userId, email: req.params.email }, function (err, user) {
                // not valid user
                if (!user){
                    console.log("Verification: not valid user");
                    res.status(401).json({msg:'We were unable to find a user for this verification. Please SignUp!'});
                } 
                // user is already verified
                else if (user.isVerified){
                    console.log("Verification: user  already veri");
                    res.status(200).json('User has been already verified. Please Login');
                }
                // verify user
                else{
                    // change isVerified to true
                    user.isVerified = true;
                    user.save(function (err) {
                        // error occur
                        if(err){
                          console.log("Verification: err updating user veri");
                          res.status(500).json({msg: err.message});
                        }
                        // account successfully verified
                        else{
                            console.log("Verification: user veri success");
                          res.status(200).json('Your account has been successfully verified');
                          next();
                        }
                    });
                }
            });
        } 
    });
});

//resend verification email
router.post("/resend-email", function (req, res, next) {

    User.findOne({ email: req.body.email }, function (err, user) {
        // user is not found into database
        if (!user){
            return res.status(400).send({msg:'We were unable to find a user with that email. Make sure your Email is correct!'});
        }
        // user has been already verified
        else if (user.isVerified){
            return res.status(200).send('This account has been already verified. Please log in.');    
        } 
        // send verification link
        else{
            // delete existing token related to the user is any
            Token.deleteMany({ _userId: user._id }).then(function (response, err){
                // generate token and save
                if(err){
                    res.status(500).json(err.message);
                }
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

            token.save(function (err) {
                if (err) {
                  res.status(500).send({msg:err.message});
                }

                email.resendVerificationEmail(user.name, user.email, req.headers.host, token.token);
            });
            });
        }
    });
});

module.exports = router;
