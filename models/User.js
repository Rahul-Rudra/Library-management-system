const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isEnable: { type: Boolean, default: true },
  password: { type: String, required: true },
  fine: { type: Number, default: 0 },
  role: {
    type: String,
    default: "user",
    enum: ["superAdmin", "Admin", "user"],
  },
  bookIssueInfo: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
