const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//importing user model
const User = require("../models/User.model");

// POST /auth/signup
router.post("/signup", (req, res, next) => {

  const {email, password, name} = req.body;
  if (email === "" || password === "" || name === "") {
    res.status(400).json({message: "please provide all the required information"})
    return;
  }


// Use regex to validate the email format
// Regular expressions / regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }
  

// Use regex to validate the password format
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
if (!passwordRegex.test(password)) {
  res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
  return;
}



  // Create salt

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);

  // Create hash
  const hashedPassword = bcrypt.hashSync(password, salt);


  const newUser = {
    email,
    password: hashedPassword,
    name
  }

  User.findOne({email: email})
  .then(foundUser => {
    if(foundUser){
      res.status(400).json({message: "email already used"});
    }

    User.create(newUser)
    .then( createdUser => {

      const {email, name, _id} = createdUser;

      const user = { email, name, _id };

      res.status(201).json({ user: user });
    })
    .catch(err => {
      console.log("Error creating new user:", err);
      res.status(500).json({message: "Error creating user"});
    })


  })
  .catch()


  // res.json({ message: "hello world" });
})


module.exports = router;


