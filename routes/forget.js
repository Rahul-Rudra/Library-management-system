const express = require("express");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

//const db = require("../models/User");
//const SECRET = "secret";

const User = require("../models/User");
const mailgun = require("mailgun-js");
const verifyToken = require("../middleware/authenticate");
const DOMAIN = "sandbox7923f71f449f422fa88d86e3d2533d5e.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("email not exists");
    }

    token = jwt.sign({ _id: user._id }, process.env.RESET_KEY, {
      expiresIn: 36000,
    });
    const currentDateTime = new Date();
    // const url = "http://localhost:3000/reset-password";

    //  console.log(user.email);
    //  console.log(currentDateTime);
    const data = {
      from: "abc@gmail.com",
      to: email,
      subject: "Foregt-Password",
      html:
        "<h1>Welcome To Daily Task Report ! </h1><p>\
      <h3>Hello " +
        user.name +
        "</h3>\
      If You are requested to reset your password then click on below link<br/>\
      <a href='http://localhost:3000/reset-password/" +
        currentDateTime +
        "+++" +
        user.email +
        "+++" +
        token +
        "'>Click On This Link</a>\
      </p>",
    };
    mg.messages().send(data, function (error, body) {
      if (error) {
        // console.log(body);
        return res.send("email not send");
      } else {
        //console.log(body);
        return res.send("email has been sent. please follow the instruction");
      }
    });
  } catch (error) {
    res.json("error");
  }
});

router.post("/updatePassword", function (req, res) {
  //console.log(req.body.email);
  User.findOne({ email: req.body.email }, function (errorFind, userData) {
    // console.log(req.body.token === req.body.linkDate);
    // console.log(req.body.token);
    //console.log(req.body.linkDate);
    if (
      //req.body.token === req.body.linkDate &&
      req.body.password === req.body.confirm_password
    ) {
      bcrypt.genSalt(10, (errB, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          let newPassword = hash;
          let condition = { _id: userData._id };
          let dataForUpdate = {
            password: newPassword,
            updatedDate: new Date(),
          };
          User.findOneAndUpdate(
            condition,
            dataForUpdate,
            { new: true },
            function (error, updatedUser) {
              if (error) {
                if (err.name === "MongoError" && error.code === 11000) {
                  return res
                    .status(500)
                    .json({ msg: "Mongo Db Error", error: error.message });
                } else {
                  return res.status(500).json({
                    msg: "Unknown Server Error",
                    error: "Unknow server error when updating User",
                  });
                }
              } else {
                if (!updatedUser) {
                  return res.status(404).json({
                    msg: "User Not Found.",
                    success: false,
                  });
                } else {
                  return res.status(200).json({
                    success: true,
                    msg: "Your password are Successfully Updated",
                    updatedData: updatedUser,
                  });
                }
              }
            }
          );
        });
      });
    }
    if (errorFind) {
      return res.status(401).json({
        msg: "Something Went Wrong",
        success: false,
      });
    }
  });
});
module.exports = router;
