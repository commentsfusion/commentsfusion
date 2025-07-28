// models/Comment.js
const { string } = require("joi");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      description: "The user who wrote this comment",
    },
    receiverProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
      description: "Whose (prospect) profile this comment was left on",
    },
    post: {
      type: string,
      required: true,
      description: "The content of post"
    },
    commentText: {
      type: String,
      required: true,
      trim: true,
      description: "The actual text of the comment",
    },
    status: {
      type: String,
      enum: ["pending", "online", "failed"],
      default: "pending",
      description: "The status of the comment",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
