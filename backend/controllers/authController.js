// controllers/authController.js
const User = require("../models/user");
const VerificationToken = require("../models/verificationToken");
const { hashPassword, signToken, comparePassword } = require("../utils/auth");
const bcryptjs = require("bcryptjs");
const { sendVerificationMail } = require("../utils/mailer");
const ApiError = require("../utils/apiError");
const { validationResult } = require("express-validator");

exports.sendVerificationCode = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, errors.array()[0].msg));
  }

  const { name, email, phone, password } = req.body;
  try {
    const existing = await User.findOne({ $or: [{ email }, { phone }] }).lean();
    if (existing) {
      const msg =
        existing.email === email
          ? "Email already registered"
          : "Phone already registered";
      throw new ApiError(409, msg);
    }

    const passwordHash = await hashPassword(password);
    const rawCode = Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = await bcryptjs.hash(rawCode, 10);

    await VerificationToken.findOneAndUpdate(
      { email },
      { name, email, phone, passwordHash, codeHash },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await sendVerificationMail(email, rawCode);
    return res.status(200).json({ message: "Verification code sent" });
  } catch (err) {
    console.error("Signup error:", err);
    if (err instanceof ApiError) return next(err);
    return next(new ApiError(500, "Internal server error"));
  }
};

exports.verifySignup = async (req, res) => {
  const { email, code } = req.body;
  const record = await VerificationToken.findOne({ email });
  if (!record) {
    return res
      .status(400)
      .json({ message: "No pending signup for this email" });
  }

  const ageMs = Date.now() - record.updatedAt.getTime();
  if (ageMs > 5 * 60 * 1000) {
    await VerificationToken.deleteOne({ email });
    return res
      .status(400)
      .json({ message: "Code expired. Please request a new one." });
  }

  const valid = await bcryptjs.compare(code, record.codeHash);
  if (!valid) {
    return res.status(400).json({ message: "Invalid code" });
  }

  let user;
  try {
    user = await new User({
      name: record.name,
      email: record.email,
      phone: record.phone,
      password: record.passwordHash,
    }).save();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error creating user", details: err.message });
  }

  const token = signToken({ userId: user._id, role: user.role });

  await VerificationToken.deleteOne({ email });

  res.status(201).json({
    message: "User created",
    token,
    user: { id: user._id, name: user.name, email, role: user.role },
  });
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, errors.array()[0].msg));
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError(401, "Invalid credentials"));
    }

    // 2) If no local password exists, tell them to use Google or reset a password
    if (!user.password) {
      return next(
        new ApiError(
          403,
          "This account is linked via Google. Please sign in with Google or sign up first."
        )
      );
    }

    // 3) Compare the submitted password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return next(new ApiError(401, "Invalid credentials"));
    }

    const token = signToken({ userId: user._id, role: user.role });
    res.json({
      message: "Logged in",
      token,
      user: { id: user._id, name: user.name, email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    return next(new ApiError(500, "Internal server error"));
  }
};
