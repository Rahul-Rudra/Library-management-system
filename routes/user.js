const express = require("express");
const { check, validationResult } = require("express-validator/check");
const db = require("../models/User");
const paginatedResults = require("../middleware/pagination");

const verifyToken = require("../middleware/authenticate");
const Admin = require("../middleware/Admin");
const {
  getUser,
  deleteUser,
  postUser,
  getSortedUser,
  editUser,
} = require("../controllers/user");

const {
  postsuperAdmin,
  getsuperAdmin,
  postAdmin,
  getAdmin,
} = require("../controllers/admin");

const router = express.Router();

router.get("/", getUser);

router.delete("/:id", deleteUser);
router.post("/", postUser);
router.post("/superadmins", postsuperAdmin);
router.get("/superadmins", getsuperAdmin);
router.post("/admins", postAdmin);
router.get("/admins", getAdmin);
router.put("/:id", editUser);
router.get("/filters", paginatedResults(db), getSortedUser);

module.exports = router;
