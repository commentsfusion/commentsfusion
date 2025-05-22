// controllers/authController.js
const User = require("../models/user");
const { hashPassword, signToken, comparePassword } = require("../utils/auth");
const ApiError = require("../utils/apiError");
const { validationResult } = require("express-validator");
const { generateOtp, verifyOtp } = require("../services/authServices");

exports.sendVerificationCode = async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  if (await User.exists({ $or: [{ email }, { phone }] })) {
    return next(new ApiError(409, "Email or phone already registered"));
  }
  const passwordHash = await hashPassword(password);
  await generateOtp(email, "signup", { name, phone, passwordHash });
  res.json({ success: true, message: "Verification code sent" });
};

exports.verifySignup = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    // this now returns `{ name, email, phone, passwordHash }`
    const rec = await verifyOtp(email, code, "signup");

    // rec is never null, so you can immediately use it:
    const user = await new User({
      name: rec.name,
      email: rec.email,
      phone: rec.phone,
      password: rec.passwordHash,
    }).save();

    const token = signToken({ userId: user._id, role: user.role });
    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
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

exports.requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;

    // 1) Check if user exists
    const exists = await User.exists({ email });
    if (!exists) {
      // 2a) If not, tell them to register
      return next(new ApiError(404, "Email not found. Please register first."));
    }

    // 3) Otherwise, generate & send the OTP
    await generateOtp(email, "forgot-password");

    // 4) And respond success
    return res.json({
      success: true,
      message: "Reset code sent to your email.",
    });
  } catch (err) {
    // any unexpected errors
    console.error("Forgot-password error:", err);
    return next(new ApiError(500, "Internal server error"));
  }
};

// --- forgot password: verify OTP only ---
exports.verifyPasswordOTP = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    await verifyOtp(email, code, "forgot-password");
    res.json({ success: true, message: "OTP verified" });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
};

// --- forgot password: reset new password ---
// --- forgot password: reset new password ---
exports.resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Passwords do not match" });
    }
    const hash = await hashPassword(newPassword);
    await User.updateOne({ email }, { password: hash });

    return res.json({ success: true, message: "Password updated" });
  } catch (err) {
    next(new ApiError(400, err.message));
  }
};
