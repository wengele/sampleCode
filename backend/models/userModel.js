const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["employer", "candidate", "admin"],
    required: true,
  },
  resume: {
    type: { filename: String, originalname: String },
  },
  approved: { type: Boolean, default: false },
  feePaid: { type: Boolean, default: false },
  skills: { type: Array, default: [] },
  color: { type: String, default: "black" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
