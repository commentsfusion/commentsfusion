const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post:    { type: mongoose.Schema.Types.ObjectId, ref: 'Post',    required: true, index: true },
  prospect:{ type: mongoose.Schema.Types.ObjectId, ref: 'Prospect', required: true, index: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile',  required: true, index: true },
  text:    { type: String, required: true },
  postedAt:{ type: Date, default: Date.now }
}, { timestamps: false });

module.exports = mongoose.model('Comment', commentSchema);