const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();
app.use(cors());

const port = process.env.PORT || 7500;
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://localhost:27017/Notebokk", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json({ extended: false }));
app.use("/api/users/", require("./routes/user"));
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/books/", require("./routes/book"));
app.use("/api/", require("./routes/issue"));
app.use("/api/activitys/", require("./routes/activity"));
app.use("/forget-password", require("./routes/forget"));
//app.use("/", require("./routes/resetforget"));
app.listen(port, (req, res) => {
  console.log("Running");
});
