// routes/authRoutes.js
const express = require("express");
const { sendCodeRules, verifySignupRules } = require("../validators/auth");
const { handleValidationErrors }       = require("../middleware/handleValidationErrors");
const {
  sendVerificationCode,
  verifySignup,
  login,
} = require("../controllers/authController");

const router = express.Router();

router.post("/send-code", sendCodeRules, sendVerificationCode);
router.post("/verify-signup", verifySignupRules, verifySignup);
router.post("/login", login);

module.exports = router;