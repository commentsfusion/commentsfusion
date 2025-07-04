// models/Comment.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  subtitle: { type: String },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = commentSchema;