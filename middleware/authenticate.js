const jwt = require("jsonwebtoken");
//const SECRET = require("../../config/Config");
//const SECRET = "secret";
require("dotenv").config();
const verifyToken = (req, res, next) => {
  // const token=req.header('Authorization');
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    /* if(!token){
          return res.status(401).json({msg:"No token ,authorization denied"});*/
  } else {
    return res.status(401).json({ msg: "No token ,authorization denied" });
  }
  try {
    const decoded = jwt.verify(req.token, process.env.SECRET_KEY);
    req.user = decoded.user;
    next();
    return;
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};

module.exports = verifyToken;
