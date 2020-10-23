const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: String,
  allowed: { type: Boolean, default: false },
  rejected: { type: Boolean, default: false },
  requested: { type: Boolean, default: false },
  book_info: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    title: String,

    ISBN: String,
  },
  user_id: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: String,
  },
});
module.exports = mongoose.model("Message", messageSchema);
