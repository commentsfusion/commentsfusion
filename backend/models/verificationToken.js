// models/VerificationToken.js
const mongoose = require("mongoose");

const verificationTokenSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  phone: String,
  passwordHash: String,
  code: String,
  createdAt: { type: Date, default: Date.now, expires: 900 },
});

module.exports = mongoose.model("VerificationToken", verificationTokenSchema);
