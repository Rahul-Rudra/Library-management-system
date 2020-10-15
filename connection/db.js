const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://Rahul:1387rahul@cluster0.zjhbo.mongodb.net/<Notebokk>?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connected");
};

module.exports = connectDB;
