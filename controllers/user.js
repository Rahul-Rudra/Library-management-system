const express = require("express");
const db = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Issue = require("../models/Issue");
const Book = require("../models/Book");
//const SECRET = "secret";
require("dotenv").config();

const getUser = async (req, res) => {
  try {
    const result = await db.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500);
  }
};

const getUserId = async (req, res) => {
  try {
    const user = await db.findById(req.params.id);
    const issue = await Issue.find({ "user_id.id": user._id });

    res.json(issue);
  } catch (error) {
    res.status(500);
  }
};

const getUserWithBookId = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const cid = req.params.id;
    const user = await db.findById(req.params.user_id);
    const pos = user.bookIssueInfo;
    //const i = pos.indexOf("_id", book._id);
    console.log(book._id);
    //console.log(i);
    //   const x = [];
    const arr = [];
    for (let i = 0; i < pos.length; i++) {
      arr.push(pos[i]._id);
    }
    console.log(arr);
    const i = arr.indexOf(req.params.id);
    console.log(i);
    // console.log(id === id1);

    // console.log(book._id === user.bookIssueInfo.value._id);
  } catch (error) {
    res.status(404);
  }
};
const getSortedUser = (req, res) => {
  res.json(res.paginatedResults);
  //res.json(result);
};

const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ errors: errors.array() });
  }

  //const {name,email,password}=req.body;
  try {
    let user = await db.findOne({ email: req.body.email });
    if (user) {
      let err = "User already exists";
      return res
        .status(400)
        .json({ error: [{ msg: "user already exists" }], err });
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
      
          id: user.id,
          name:user.name,
          email:user.email

       
      };
      jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
        if (err) throw err;
        res.json(token);
      });
    } else {
      return res.status(400).json({ msg: "In body there must be 4 key-value" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
/*
const emailActivate = async (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decodedToken) {
      if (err) {
        res.status(400).json({ error: "Incorrect or expire link" });
      }
      const { name, email, password,role } = decodedToken;
       let user = await db.findOne({ email: req.body.email });
    if (user) {
      let err = "User already exists";
      return res
        .status(400)
        .json({ error: [{ msg: "user already exists" }], err });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = new db({
      name,
      email,
      password: hashed,
      role: req.body.role,
    });
    });
  } else {
    res.json({ msg: "something went wrong" });
  }
};
*/
const deleteUser = async (req, res) => {
  const result = await db.findByIdAndRemove(req.params.id);
  res.json({ message: "Successfully deleted" });
};

const getUserWithId = async (req, res) => {
  const result = await db.findById(req.params.id);
  res.json(result);
  console.log(result.name);
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
  getUserWithId,
  getUserId,
  getUserWithBookId,
};
