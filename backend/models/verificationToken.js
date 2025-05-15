// models/VerificationToken.js
const mongoose = require("mongoose");

const verificationTokenSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: String,
    phone: String,
    passwordHash: String,
    codeHash: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("VerificationToken", verificationTokenSchema);
