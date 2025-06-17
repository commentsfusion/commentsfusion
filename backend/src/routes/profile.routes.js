// src/routes/profile.routes.js
const express = require("express");
const { asyncHandler } = require("../middleware/errorHandler");
const {profileController} = require('../controllers');

const router = express.Router();

//router.post("/check-user-exists", asyncHandler(profileController.checkUserExists));

router.post("/extract-profile-data", asyncHandler(profileController.extractProfileData));

router.post("/generate-reply", asyncHandler(profileController.generateReply));

module.exports = router;
