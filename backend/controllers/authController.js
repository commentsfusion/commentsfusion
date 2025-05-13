// controllers/authController.js
const User = require("../models/user");
const VerificationToken = require("../models/verificationToken");
const { hashPassword, comparePassword, signToken } = require("../utils/auth");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const bcryptjs = require("bcryptjs");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT || 587,
  secure: process.env.SECURE,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendVerificationCode = async (req, res) => {
  // 1) Validate input...
  const { name, email, phone, password } = req.body;

  // 2) Hash the user’s password for later
  const passwordHash = await hashPassword(password);

  // 3) Generate & hash a 6-digit code
  const rawCode = Math.floor(100000 + Math.random() * 900000).toString();
  const codeHash = await bcryptjs.hash(rawCode, 10);

  // 4) Upsert the token document
  await VerificationToken.findOneAndUpdate(
    { email },
    { name, email, phone, passwordHash, codeHash },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // 5) Send the email async
  transporter
    .sendMail({
      from: process.env.SMTP_USER, 
      to: email,
      subject: "Your verification code",
      text: `Your signup code is ${rawCode}. It expires in 15 minutes.`,
    })
    .catch((err) => console.error("Email failed:", err));

  res.json({ message: "Verification code sent" });
};

exports.verifySignup = async (req, res) => {
  const { email, code } = req.body;
  const record = await VerificationToken.findOne({ email });
  if (!record) {
    return res
      .status(400)
      .json({ message: "No pending signup for this email" });
  }
  // 1) Check code
  const valid = await bcryptjs.compare(code, record.codeHash);
  if (!valid) {
    return res.status(400).json({ message: "Invalid or expired code" });
  }

  // 2) Create the real user
  const user = new User({
    name: record.name,
    email: record.email,
    phone: record.phone,
    password: record.passwordHash,
  });
  await user.save();

  // 3) Issue JWT
  const token = signToken({ userId: user._id, role: user.role });

  // 4) Clean up
  await VerificationToken.deleteOne({ email });

  res.status(201).json({
    message: "User created",
    token,
    user: { id: user._id, name: user.name, email, role: user.role },
  });
};

exports.signup = async (req, res) => {
  // 1) run validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // send first error message
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { name, email, phone, password } = req.body;

  try {
    // 2) check email
    if (await User.findOne({ email })) {
      return res.status(409).json({ message: "Email already registered" });
    }
    if (await User.findOne({ phone })) {
      return res
        .status(409)
        .json({ message: "Phone number already registered" });
    }

    // 3) hash & save
    const hashed = await hashPassword(password);
    const user = new User({ name, email, phone, password: hashed });
    await user.save();

    // 4) issue JWT
    const token = signToken({ userId: user._id, role: user.role });

    res.status(201).json({
      message: "User created",
      token,
      user: { id: user._id, name: user.name, email, role: user.role },
    });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern) {
      if (err.keyPattern.email) {
        return res.status(409).json({ message: "Email already registered" });
      }
      if (err.keyPattern.phone) {
        return res
          .status(409)
          .json({ message: "Phone number already registered" });
      }
    }

    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = signToken({ userId: user._id, role: user.role });
    res.json({
      message: "Logged in",
      token,
      user: { id: user._id, name: user.name, email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
