const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL =
  process.env.MONGO_URL ||
  "";

const connectDB = async () => {
  if(process.env.NODE_ENV==='test')
  {
    await mongoose.connect("mongodb+srv://Rahul:NApz2T2FcT7tjrXQ@cluster0.zjhbo.mongodb.net/Notebook_test?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to test mode");
  }
  else{
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connected");
}
};

module.exports = connectDB;
