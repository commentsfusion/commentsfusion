// controllers/authController.js
const User = require("../models/user");
const { hashPassword, comparePassword, signToken } = require("../utils/auth");
const { validationResult } = require("express-validator");

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
