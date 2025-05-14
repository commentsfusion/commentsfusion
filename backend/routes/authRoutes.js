// routes/authRoutes.js
const express = require("express");
const { sendCodeRules, verifySignupRules } = require("../validators/auth");
const { handleValidationErrors }       = require("../middleware/handleValidationErrors");
const {
  sendVerificationCode,
  verifySignup,
  login,
} = require("../controllers/authController");


const rateLimit = require('express-rate-limit');
const sendCodeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: 'Too many signup attempts, please try later.'
});

const router = express.Router();

router.post('/send-code', ...sendCodeRules, sendCodeLimiter, handleValidationErrors, sendVerificationCode);
router.post("/verify-signup", ...verifySignupRules, handleValidationErrors, verifySignup);
router.post("/login", login);

module.exports = router;