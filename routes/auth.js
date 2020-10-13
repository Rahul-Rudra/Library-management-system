const express = require("express");

const router = express.Router();
//const bcrypt = require("bcryptjs");
const verifyToken = require("../middleware/authenticate");

//const db = require("../models/User");
const { getUserToken, getUserBasedOnToken } = require("../controllers/auth");

router.post("/", getUserToken);

router.get("/", verifyToken, getUserBasedOnToken);

module.exports = router;
