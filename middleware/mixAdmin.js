const mongoose = require("mongoose");
const data = require("../models/User");

const mixAdmin = async (req, res, next) => {
  try {
    const id = req.user.id;
    //console.log(id);
    const db = await data.findById(id);
    // console.log(db);
    if (db.role === "superAdmin" || db.role === "Admin") {
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
module.exports = mixAdmin;
