// routes/authRoutes.js
const express = require("express");
const {
  sendCodeRules,
  verifyOTPRules,
  loginRules,
  forgotPasswordRules,
  resetPasswordRules
} = require("../middleware/validators/auth");
const {
  handleValidationErrors,
} = require("../middleware/handleValidationErrors");
const {authController} = require('../controllers');
const passport = require("passport");
const { signToken } = require("../utils/auth");
const rateLimit = require("express-rate-limit");
const { asyncHandler } = require("../middleware/errorHandler");
const recaptchaFallback = require("../middleware/recaptchaFallback");
const { getUserDetails, getGoogleUserDetails } = require('../controllers/auth.controller');  
const { protect } = require("../middleware/auth");


const attemptLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 15,
  handler: (req, res) => {
    res
      .status(429)
      .json({ message: "Too many attempts, please try later." });
  },
});

const router = express.Router();

router.post(
  "/send-code",
  attemptLimiter,
  ...sendCodeRules,
  handleValidationErrors,
  recaptchaFallback("signup"),
  asyncHandler(authController.sendVerificationCode)
);

router.post(
  "/verify-signup",
  attemptLimiter,
  ...verifyOTPRules,
  handleValidationErrors,
  asyncHandler(authController.verifySignup)
);

router.post(
  "/login",
  attemptLimiter,
  ...loginRules,
  handleValidationErrors,
  recaptchaFallback("login"),
  asyncHandler(authController.login)
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

router.post(
  "/forgot-password",
  attemptLimiter,
  ...forgotPasswordRules,
  handleValidationErrors,
  asyncHandler(authController.requestPasswordReset)
);

router.post(
  "/forgot-password/verify-otp",
  attemptLimiter,
  ...verifyOTPRules,
  handleValidationErrors,
  asyncHandler(authController.verifyPasswordOTP)
);

router.post(
  "/forgot-password/reset",
  attemptLimiter,
  ...resetPasswordRules,
  handleValidationErrors,
  asyncHandler(authController.resetPassword)
);

router.post('/logout', (req, res) => {
  res.clearCookie("auth_token");
  res.status(200).json({ message: 'Logged out successfully' });
});

router.get('/user', protect, getUserDetails);

router.get('/google-user', getGoogleUserDetails);

module.exports = router;
