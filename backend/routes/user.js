const { userSchema, User, validate } = require("../models/user");
const mongoose = require("../db/connection");
const _ = require("lodash"); // For some extra utilities
const express = require("express");
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens

const router = express.Router();
const SECRET = "mywifiislit";

router.post("/signup", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User already registered.");
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      userType: req.body.userType,
      userDepartment: req.body.userDepartment,
    });

    await user.save();

    res.send(_.pick(user, ["id", "name", "email"]));
  } catch (e) {
    res.status(400).json({ e });
  }
});

router.post("/login", async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign(
          { email: user.email, name: user.name },
          SECRET
        );
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
