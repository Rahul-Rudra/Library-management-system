const express = require("express");
const mongoose = require("mongoose");
const db = require("../models/Activity");
const paginatedResults = require("../middleware/pagination");
const verifyToken = require("../middleware/authenticate");
const Admin = require("../middleware/Admin");
const router = express.Router();

router.get("/filters", verifyToken, Admin, paginatedResults(db), (req, res) => {
  res.json(res.paginatedResults);
  //res.json(result);
});

router.get("/", async (req, res) => {
  try {
    const result = await db.find();
    res.json(result);
  } catch (error) {
    res.status(404).json("No activity");
  }
});

module.exports = router;
