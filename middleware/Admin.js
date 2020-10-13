const User = require("../models/User");
const mongoose = require("mongoose");
const data = require("../models/User");

const Admin = async (req, res, next) => {
  try {
    const id = req.user.id;
    //console.log(id);
    const db = await data.findById(id);
    //console.log(db);
    //console.log(req.user.role);
    //  const User = req.user;
    if (db.role === "superAdmin") {
      return next();
    } else {
      return res
        .status(401)
        .send({ message: "Admin Token is not valid or You are not a admin" });
    }
  } catch (error) {
    return res.status(401).send({ message: "Admin Token is not valid." });
  }
};
module.exports = Admin;
