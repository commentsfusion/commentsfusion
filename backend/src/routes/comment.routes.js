// routes/commentRoutes.js
const express = require("express");
const { protect } = require("../middleware/auth");
const { asyncHandler } = require("../middleware/errorHandler");
const { commentController } = require("../controllers");

const router = express.Router();

router.post("/save-comment", protect, asyncHandler(commentController.createComment));

module.exports = router;
