// routes/authRoutes.js
const express = require("express");
const { sendCodeRules, verifySignupRules, loginRules } = require("../validators/auth");
const {
  handleValidationErrors,
} = require("../middleware/handleValidationErrors");
const {
  sendVerificationCode,
  verifySignup,
  login,
} = require("../controllers/authController");

const rateLimit = require("express-rate-limit");
const { asyncHandler } = require("../middleware/errorHandler");
const sendCodeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: "Too many signup attempts, please try later.",
});

const router = express.Router();

router.post(
  "/send-code",
  ...sendCodeRules,
  sendCodeLimiter,
  handleValidationErrors,
  asyncHandler(sendVerificationCode)
);
router.post(
  "/verify-signup",
  ...verifySignupRules,
  handleValidationErrors,
  asyncHandler(verifySignup)
);

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,
  message: "Too many login attempts, please try later.",
});

router.post(
  "/login",
  loginLimiter,
  ...loginRules,
  handleValidationErrors,
  asyncHandler(login)
);

module.exports = router;
