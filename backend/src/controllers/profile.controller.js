// src/controllers/profile.controller.js
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status").default;
const fs = require("fs");
const path = require("path");

const { profileService } = require("../services");

exports.checkProfileExists = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { linkedinUsername } = req.params;
    const exists = await profileService.checkUserExists(
      userId,
      linkedinUsername
    );
    res.json({ exists, message: exists ? "Exists" : "Not found" });
  } catch (err) {
    next(err);
  }
};

exports.extractProfileData = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { userID: linkedinUsername, profileHtml, networkHtml } = req.body;

    const profile = await profileService.upsertProfileData(
      userId,
      linkedinUsername,
      profileHtml,
      networkHtml
    );

    res.json(profile);
  } catch (err) {
    next(err);
  }
};

exports.generateReply = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const {
      userID: targetLinkedInUsername,
      postContent,
      prompt,
      comment,
    } = req.body;
    const reply = await profileService.generateReply({
      userId,
      targetLinkedInUsername,
      postContent,
      promptTone: prompt,
      commentThread: comment,
    });
    res.json({ reply });
  } catch (err) {
    console.error("generateReply error:", err);

    if (err.code === "insufficient_quota" || err.status === 429) {
      return res.status(429).json({ error: err.error?.message || err.message });
    }

    if (err instanceof ApiError && err.statusCode === httpStatus.NOT_FOUND) {
      return res.status(httpStatus.NOT_FOUND).json({ error: err.message });
    }

    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};
