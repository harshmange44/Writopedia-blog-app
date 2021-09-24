const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

// let fileFilter = function (req, file, cb) {
//   var allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
//   if (allowedMimes.includes(file.mimetype)) {
//       cb(null, true);
//   } else {
//       cb({
//           success: false,
//           message: 'Invalid file type. Only jpg, png image files are allowed.'
//       }, false);
//   }
// };
// let obj = {
//   storage: storage,
//   limits: {
//       fileSize: 200 * 1024 * 1024
// },
//   fileFilter: fileFilter
// };

var upload = multer({ storage: storage });

//UPDATE WHOLE DOC
router.put("/:id", upload.single('imgFile'), async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    if(req.file){
      const img = fs.readFileSync(req.file.path);
      var encode_img = img.toString('base64');
      req.body.profilePic = Buffer.from(encode_img).toString('base64');
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Authorization failed !! Please sign in again...");
  }
});

//UPDATE ATTR only
router.patch("/:id", upload.single('imgFile'), async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    if(req.file){
      const img = fs.readFileSync(req.file.path);
      var encode_img = img.toString('base64');
      req.body.profilePic = Buffer.from(encode_img).toString('base64');
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Authorization failed !! Please sign in again...");
  }
});
//DELETE
router.delete("/:id", async (req, res) => {
  // if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  // } else {
    // res.status(401).json("You can delete only your account!");
  // }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
