const express = require("express");
const db = require("../models/User");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const SECRET = "secret";
require("dotenv").config();

const getUser = async (req, res) => {
  try {
    const result = await db.find();
    res.json(result);
  } catch (error) {
    res.status(500);
  }
};

const getSortedUser = (req, res) => {
  res.json(res.paginatedResults);
  //res.json(result);
};

const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //const {name,email,password}=req.body;
  try {
    let user = await db.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: [{ msg: "user already exists" }] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    user = new db({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
      role: req.body.role,
    });

    if (Object.keys(req.body).length === 4) {
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
      return res.status(400).json({ msg: "In body there must be 3 key-value" });
    }
  } catch (error) {
    res.status(500).send("server error");
  }
};

const deleteUser = async (req, res) => {
  const result = await db.findByIdAndRemove(req.params.id);
  res.json({ message: "Successfully deleted" });
};

const editUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //const {name,email,password}=req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const user = await db.findByIdAndUpdate(req.params.id);

    user.password = hashed;
    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;

    // console.log(user.email);
    // user.set(req.body);
    await user.save();

    res.json({ msg: "Successfully updated" });
  } catch (error) {
    res.status(500).send("server error");
  }
};

module.exports = {
  getUser,
  postUser,
  deleteUser,
  getSortedUser,
  editUser,
};
