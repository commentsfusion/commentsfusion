// services/commentService.js
const Comment = require("../models/comment");
const Profile = require("../models/profile");
const mongoose = require("mongoose");

const MAX_LIMIT = 100;

async function createComment({
  commenterId,
  receiverLinkedInUsername,
  postContent,
  commentText,
}) {
  let receiverProfile = await Profile.findOne({
    linkedinUsername: receiverLinkedInUsername,
    user: null,
  });
  if (!receiverProfile) {
    receiverProfile = await Profile.create({
      linkedinUsername: receiverLinkedInUsername,
      user: null,
    });
  }

  const comment = await Comment.create({
    commenter: commenterId,
    receiverProfile: receiverProfile._id,
    post: postContent,
    commentText,
  });

  return comment;
}

async function listComments(options = {}) {
  const {
    commenterId,
    page = 1,
    limit = 5,
    status,
    account,
    from,
    to,
    sort = "-createdAt",
  } = options;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  let lim = Math.max(1, parseInt(limit, 10) || 3);
  lim = Math.min(lim, MAX_LIMIT);
  const skip = (pageNum - 1) * lim;

  const match = {};

  if (commenterId) {
    try {
      match.commenter = mongoose.Types.ObjectId(String(commenterId));
    } catch (e) {
      match.commenter = null;
    }
  }

  if (status) match.status = status;

  if (from || to) {
    const createdAt = {};
    if (from) {
      const d = new Date(from);
      if (!isNaN(d)) createdAt.$gte = d;
    }
    if (to) {
      const d2 = new Date(to);
      if (!isNaN(d2)) createdAt.$lte = d2;
    }
    if (Object.keys(createdAt).length) match.createdAt = createdAt;
  }

  if (account) {
    try {
      match.receiverProfile = mongoose.Types.ObjectId(String(account));
    } catch (e) {
      match.receiverProfile = null;
    }
  }

  const pipeline = [{ $match: match }];

  const receiverPath = Comment.schema.path("receiverProfile");
  const receiverRefModel =
    receiverPath && receiverPath.options && receiverPath.options.ref;

  if (receiverRefModel) {
    const foreignCollName = mongoose.model(receiverRefModel).collection.name;
    pipeline.push({
      $lookup: {
        from: foreignCollName,
        localField: "receiverProfile",
        foreignField: "_id",
        as: "receiverProfile",
      },
    });
    pipeline.push({
      $unwind: { path: "$receiverProfile", preserveNullAndEmptyArrays: true },
    });
  }

  const sortObj = {};
  const sortFields = String(sort)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (sortFields.length === 0) {
    sortObj.createdAt = -1;
  } else {
    for (const f of sortFields) {
      if (f.startsWith("-")) sortObj[f.slice(1)] = -1;
      else sortObj[f] = 1;
    }
  }

  pipeline.push({
    $facet: {
      data: [{ $sort: sortObj }, { $skip: skip }, { $limit: lim }],
      totalCount: [{ $count: "count" }],
    },
  });

  const agg = await Comment.aggregate(pipeline).allowDiskUse(true);
  const facetResult = agg[0] || { data: [], totalCount: [] };
  const data = facetResult.data || [];
  const total =
    (facetResult.totalCount &&
      facetResult.totalCount[0] &&
      facetResult.totalCount[0].count) ||
    0;

  if (!receiverRefModel && data.length) {
    await Comment.populate(data, {
      path: "receiverProfile",
      select: "name tag_line",
    });
  }

  return {
    data,
    page: pageNum,
    limit: lim,
    total,
    totalPages: Math.ceil(total / lim),
  };
}

module.exports = {
  createComment,
  listComments,
};
