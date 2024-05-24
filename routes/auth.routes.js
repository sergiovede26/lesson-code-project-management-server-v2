const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//importing user model
const User = require("../models/User.model");

// POST /auth/signup
router.post("/signup", (req, res, next) => {

  const {email, password, name} = req.body;

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

  // res.json({ message: "hello world" });
})


module.exports = router;


