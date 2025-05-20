// routes/authRoutes.js
const express = require("express");
const {
  sendCodeRules,
  verifySignupRules,
  loginRules,
} = require("../middleware/validators/auth");
const {
  handleValidationErrors,
} = require("../middleware/handleValidationErrors");
const {
  sendVerificationCode,
  verifySignup,
  login,
} = require("../controllers/authController");
const passport = require("passport");
const { signToken } = require("../utils/auth");
const rateLimit = require("express-rate-limit");
const { asyncHandler } = require("../middleware/errorHandler");
const recaptchaFallback = require("../middleware/recaptchaFallback");

const sendCodeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: "Too many signup attempts, please try later.",
});

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: "Too many login attempts, please try later.",
});

const router = express.Router();

router.post(
  "/send-code",
  sendCodeLimiter,
  ...sendCodeRules,
  handleValidationErrors,
  recaptchaFallback("signup"),
  asyncHandler(sendVerificationCode)
);

router.post(
  "/verify-signup",
  ...verifySignupRules,
  handleValidationErrors,
  asyncHandler(verifySignup)
);

router.post(
  "/login",
  loginLimiter,
  ...loginRules,
  handleValidationErrors,
  recaptchaFallback("login"),
  asyncHandler(login)
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login?error=oauth_failed",
    session: true,
  }),
  (req, res) => {
    const token = signToken({ userId: req.user._id, role: req.user.role });
    res.redirect(`${process.env.FRONTEND_URL}/oauth_success?token=${token}`);
  }
);

module.exports = router;
