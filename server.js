const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();
app.use(cors());
require("dotenv").config();
//const mongoUrl = require("./connection/db");
const port = process.env.PORT || 7500;
mongoose.set("useCreateIndex", true);
const connectDB = require("./connection/db");
connectDB();
app.use(express.json({ extended: false }));
app.use("/api/users/", require("./routes/user"));
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/books/", require("./routes/book"));
app.use("/api/", require("./routes/issue"));
app.use("/api/activitys/", require("./routes/activity"));
app.use("/forget-password", require("./routes/forget"));
//app.use("/", require("./routes/resetforget"));
//"test": "echo \"Error: no test specified\" && exit 1",
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(port, (req, res) => {
  console.log("Running");
});
