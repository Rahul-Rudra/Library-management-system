const mongoose = require("mongoose");
const mongo =
  "mongodb+srv://Rahul:1387rahul@cluster0.zjhbo.mongodb.net/<Notebokk>?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connected");
};

module.exports = connectDB;
