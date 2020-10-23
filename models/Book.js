const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  ISBN: String,
  stock: Number,
  author: String,
  userId: [],
});

module.exports = mongoose.model("Book", bookSchema);
