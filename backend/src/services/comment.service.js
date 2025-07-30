// services/commentService.js
const Comment = require('../models/Comment');
const Profile = require('../models/profile');
const ApiError = require('../utils/apiError');

async function createComment({ commenterId, receiverLinkedInUsername, postContent, commentText }) {
  const receiverProfile = await Profile.findOne({
    linkedinUsername: receiverLinkedInUsername,
    user: null
  });
  if (!receiverProfile) {
    throw new ApiError(404, 'Prospect profile not found');
  }

  const comment = await Comment.create({
    commenter:      commenterId,
    receiverProfile: receiverProfile._id,
    post:           postContent,
    commentText
  });

  return comment;
}

module.exports = {
  createComment
};
