// routes/auth.js
const express = require("express");
const { body } = require("express-validator");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
