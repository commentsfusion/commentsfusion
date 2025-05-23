// services/authServices.js
const VerificationToken = require("../models/verificationToken");
const bcrypt = require("bcryptjs");
const { sendVerificationMail } = require("../utils/mailer");

async function generateOtp(email, purpose, extra = {}) {
  const rawCode   = Math.floor(100000 + Math.random()*900000).toString();
  const codeHash  = await bcrypt.hash(rawCode, 10);
  const expiresAt = new Date(Date.now() + 10*60*1000);

  await VerificationToken.findOneAndUpdate(
    { email, purpose },
    { email, purpose, codeHash, expiresAt, ...extra },
    { upsert:true, new:true, setDefaultsOnInsert:true }
  );

  await sendVerificationMail(email, rawCode);
}

async function verifyOtp(email, code, purpose) {
  // 1) Find the record
  const record = await VerificationToken.findOne({ email, purpose });
  if (!record) throw new Error("No pending action for this email");

  // 2) Check expiry
  if (record.expiresAt < Date.now()) {
    await VerificationToken.deleteMany({ email, purpose });
    throw new Error("Code expired");
  }

  // 3) Compare
  const valid = await bcrypt.compare(code, record.codeHash);
  if (!valid) {
    throw new Error("Invalid code");
  }

  // 4) Copy the useful parts
  const data = {
    name:         record.name,
    email:        record.email,
    phone:        record.phone,
    passwordHash: record.passwordHash,
  };

  // 5) Now clean up
  await VerificationToken.deleteMany({ email, purpose });

  // 6) Return the data you need downstream
  return data;
}

module.exports = {
  generateOtp,
  verifyOtp,
};