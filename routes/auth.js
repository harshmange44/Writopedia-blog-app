const router = require("express").Router();
const User = require("../models/User");
const Token = require("../models/Token");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
var email = require('../utility/mailer');

//REGISTER
router.post("/register", async (req, res) => {

  User.findOne({ username: req.body.username }, async function (err, user) {

    // error occur
    if(err){
      res.status(500).json({msg: err.message});
  }
  // if email is exist into database i.e. email is associated with another user.
  else if (user) {
      res.status(400).json({msg:'This username is already associated with another account.'});
  }else{

  try {
    const hashedPass = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();

    if(user){
      var newToken = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
      const token = await newToken.save();

    if(!token){
        res.status(500).json(err);
      }else{

    email.welcome(user.name, user.email, req.headers.host, token.token);

    res.status(200).json(user);
    }
    }else{
      res.status(500).json("Something went wrong");
    }

  } catch (err) {
    res.status(500).json(err);
  }
}
});
});

//LOGIN
router.post("/login", (req, res) => {
      User.findOne({ username: req.body.username }).then(user => {
      !user && res.status(400).json({message: "Wrong username!"});
      
      user && bcrypt.compare(req.body.password, user.password).then(validated => {
        !validated && res.status(400).json({message: "Wrong password!"});

        const { password, ...others } = user._doc;

        !user.isVerified && res.status(401).json({message: 'Your Email has not been verified. Please check your email'});

        user && user.isVerified && res.status(200).json(others);
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
});

module.exports = router;
