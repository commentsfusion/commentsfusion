// validators/auth.js
const { body } = require("express-validator");

exports.sendCodeRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone")
    .isLength({ min: 10 }).withMessage("Phone must be at least 10 digits")
    .matches(/^\d+$/).withMessage("Phone must contain only numbers"),
  body("password")
    .isLength({ min: 8 }).withMessage("Password must be 8+ chars")
    .matches(/\d/).withMessage("Password must include a digit")
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("Password needs a special char"),
];

exports.verifySignupRules = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("code")
    .isLength({ min: 6, max: 6 }).withMessage("Code must be 6 digits")
    .isNumeric().withMessage("Code must be numeric"),
];
