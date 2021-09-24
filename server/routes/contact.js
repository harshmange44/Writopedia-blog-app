const router = require("express").Router();
const ContactMsg = require("../models/ContactMsg");
var email = require('../utility/mailer');

//REGISTER
router.post("/post-contact", async (req, res) => {
  try {
    const contactMessage = new ContactMsg({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    });
  
    const savedContactMessage = await contactMessage.save();

    email.feedback(savedContactMessage.name, savedContactMessage.email, savedContactMessage.message);
    res.status(200).send("Email sent");

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
