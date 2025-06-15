// models/Profile.js
const mongoose = require("mongoose");

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
  posts: [String],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastFetchedAt: { type: Date, default: null },
});

profileSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model("Profile", profileSchema);
