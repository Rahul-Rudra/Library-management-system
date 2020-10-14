const express = require("express");
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models/User");
//const SECRET = "secret";
require("dotenv").config();

const getUserToken =
  ([
    check("email", "please mention a valid email").isEmail(),
    check("password", "password is required").exists().isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await db.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "user not exists" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "password incorrect" });
      }

      if (user.isEnable === false) {
        return res.status(401).json("user is disabled");
      } else {
        /*const payload = {
          id: user.id,
        };*/
        const role = user.role;
        const id = user.id;
        const name = user.name;
        jwt.sign({ role, id, name }, process.env.SECRET_KEY, (err, token) => {
          if (err) throw err;
          res.json({ token, role, id, name });
        });
      }
    } catch (error) {
      res.status(500).send("server error");
    }
  });

const getUserBasedOnToken = async (req, res) => {
  try {
    const user = await db.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

module.exports = {
  getUserToken,
  getUserBasedOnToken,
};
