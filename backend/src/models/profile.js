// models/Profile.js
const mongoose = require("mongoose");
const commentSchema = require("./comments");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  linkedinUsername: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  name: String,
  tag_line: String,
  location: String,
  about: String,
  services: String,

  connections: {
    type: Number,
    default: 0,
    description: "Number of LinkedIn connections",
  },
  followers: {
    type: Number,
    default: 0,
    description: "Number of LinkedIn followers",
  },

  comments: {
    type: [commentSchema],
    default: [],
    description: 'Array of comments associated with this profile',
  },

  experience: [
    {
      role: String,
      at: String,
    },
  ],

  education: [
    {
      place: String,
      degree: String,
    },
  ],

  certifications: [
    {
      certificate: String,
      issuer: String,
    },
  ],

  projects: [String],
  skills: [String],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastFetchedAt: { type: Date, default: null },
});

profileSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model("Profile", profileSchema);
