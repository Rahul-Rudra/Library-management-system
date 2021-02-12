const express = require("express");
const db = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const SECRET = "secret";
require("dotenv").config();

const getsuperAdmin = async (req, res) => {
  try {
    const result = await db.find({ role: "superAdmin" });
    res.json(result);
  } catch (error) {
    res.status(500);
  }
};

const getAdmin = async (req, res) => {
  try {
    const result = await db.find({ role: "Admin" });
    res.json(result);
  } catch (error) {
    res.status(500);
  }
};

const postsuperAdmin =
  ([
    check("name", "please include name").not().isEmpty(),
    check("email", "please mention a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //const {name,email,password}=req.body;
    try {
      let user = await db.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: [{ msg: "user already exists" }] });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      user = new db({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        role: "superAdmin",
      });

      if (Object.keys(req.body).length === 3) {
        await user.save();

        //res.json(user);

        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      } else {
        return res
          .status(400)
          .json({ msg: "In body there must be 3 key-value" });
      }
    } catch (error) {
      res.status(500).send("server error");
    }
  });

const postAdmin =
  ([
    check("name", "please include name").not().isEmpty(),
    check("email", "please mention a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //const {name,email,password}=req.body;
    try {
      let user = await db.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: [{ msg: "user already exists" }] });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      user = new db({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        role: "Admin",
      });

      if (Object.keys(req.body).length === 3) {
        await user.save();

        //res.json(user);

        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      } else {
        return res
          .status(400)
          .json({ msg: "In body there must be 3 key-value" });
      }
    } catch (error) {
      res.status(500).send("server error");
    }
  });

module.exports = {
  postsuperAdmin,
  getsuperAdmin,
  postAdmin,
  getAdmin,
};
