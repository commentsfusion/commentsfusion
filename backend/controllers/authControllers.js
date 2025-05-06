// controllers/authController.js
const User = require("../models/user");
const { hashPassword, comparePassword, signToken } = require("../utils/auth");
const { validationResult } = require("express-validator");

exports.signup = async (req, res) => {
  // 1) Validate incoming data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // 2) Ensure email isn’t taken
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 3) Hash & save
    const hashed = await hashPassword(password);
    user = new User({ name, email, password: hashed });
    await user.save();

    // 4) Issue token
    const token = signToken({ userId: user._id, role: user.role });

    res.status(201).json({
      message: "User created",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1) Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2) Check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3) Issue token
    const token = signToken({ userId: user._id, role: user.role });

    res.json({
      message: "Logged in",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
