const express = require("express");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator/check");
const Admin = require("../middleware/Admin");
const verifyToken = require("../middleware/authenticate");
const db = require("../models/Issue");
const Book = require("../models/Book");
const User = require("../models/User");
const Activity = require("../models/Activity");
const {
  issueBook,
  returnBook,
  getIssueBook,
  renewBook,
} = require("../controllers/issue");

const router = express.Router();

router.post("/book/:book_id/issue/:user_id", issueBook);

router.post("/return/book_id/:book_id/user_id/:id", returnBook);

router.post("/renew/book_id/:id/user_id/:user_id", renewBook);

router.get("/issued/books", getIssueBook);

module.exports = router;
