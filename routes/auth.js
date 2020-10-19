const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
//const bcrypt = require("bcryptjs");
const verifyToken = require("../middleware/authenticate");

//const db = require("../models/User");
const { getUserToken, getUserBasedOnToken } = require("../controllers/auth");

router.post(
  "/",
  [
    check("email", "please mention a valid email").isEmail(),
    check("password", "password is required").exists().isLength({ min: 6 }),
  ],
  getUserToken
);

router.get("/", verifyToken, getUserBasedOnToken);

module.exports = router;
