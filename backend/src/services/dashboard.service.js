const Profile = require("../models/profile");
const Comment = require("../models/comment");
const mongoose = require("mongoose");

const PERIOD_MS = {
  "7d": 7 * 24 * 3600 * 1000,
  "15d": 15 * 24 * 3600 * 1000,
  "30d": 30 * 24 * 3600 * 1000,
};

async function getMetrics(userId, period) {
  const lookback = PERIOD_MS[period] || PERIOD_MS["7d"];
  const since = new Date(Date.now() - lookback);

  // 1) Followers time series
  const profile = await Profile.findOne({ user: userId });
  
  // Handle case where profile doesn't exist
  if (!profile) {
    // Return default empty metrics if no profile exists
    const comments = await Comment.find({
      commenter: userId,
      createdAt: { $gte: since },
    });
    
    const totalComments = comments.length;
    
    // Build daily count for comments
    const dayBuckets = {};
    for (let i = 0; i <= lookback / (24 * 3600 * 1000); i++) {
      const day = new Date(Date.now() - i * 24 * 3600 * 1000)
        .toISOString()
        .slice(0, 10);
      dayBuckets[day] = 0;
    }
    comments.forEach((c) => {
      const day = c.createdAt.toISOString().slice(0, 10);
      if (day in dayBuckets) dayBuckets[day]++;
    });
    const commentsSeries = Object.entries(dayBuckets)
      .map(([day, count]) => ({ x: day, y: count }))
      .sort((a, b) => a.x.localeCompare(b.x));
    
    return {
      followersCount: 0,
      followersSeries: [],
      connectionsCount: 0,
      connectionsSeries: [],
      totalComments,
      commentsSeries,
    };
  }

  const followersSeries = profile.followerSnapshots
    .filter((s) => s.timestamp >= since)
    .map((s) => ({ x: s.timestamp, y: s.count }));

  // 2) Connections time series
  const connectionsSeries = profile.connectionSnapshots
    .filter((s) => s.timestamp >= since)
    .map((s) => ({ x: s.timestamp, y: s.count }));

  // 3) Comments count total in that window + per-day series
  const comments = await Comment.find({
    commenter: userId,
    createdAt: { $gte: since },
  });

  const totalComments = comments.length;

  // Build daily count
  const dayBuckets = {};
  for (let i = 0; i <= lookback / (24 * 3600 * 1000); i++) {
    const day = new Date(Date.now() - i * 24 * 3600 * 1000)
      .toISOString()
      .slice(0, 10);
    dayBuckets[day] = 0;
  }
  comments.forEach((c) => {
    const day = c.createdAt.toISOString().slice(0, 10);
    if (day in dayBuckets) dayBuckets[day]++;
  });
  const commentsSeries = Object.entries(dayBuckets)
    .map(([day, count]) => ({ x: day, y: count }))
    .sort((a, b) => a.x.localeCompare(b.x));

  return {
    followersCount: profile?.followers || 0,
    followersSeries,
    connectionsCount: profile?.connections || 0,
    connectionsSeries,
    totalComments,
    commentsSeries,
  };
}

async function getTargets(
  userId,
  period = "15d",
  { page = 1, limit = 7, sort = "-commentsCount" } = {}
) {
  // validate userId
  if (!userId) {
    const err = new Error("Missing userId");
    err.status = 400;
    throw err;
  }
  if (!mongoose.isValidObjectId(String(userId))) {
    const err = new Error("Invalid userId");
    err.status = 400;
    throw err;
  }

  const lookback = PERIOD_MS[period] || PERIOD_MS["15d"];
  const since = new Date(Date.now() - lookback);

  const pageNum = Math.max(1, parseInt(page, 10));
  const lim = Math.max(1, parseInt(limit, 10));
  const skip = (pageNum - 1) * lim;

  try {
    // construct an ObjectId with `new`
    const commenterId = new mongoose.Types.ObjectId(String(userId));

    const profileCollName =
      (Profile && Profile.collection && Profile.collection.name) || "profiles";

    const pipeline = [
      {
        $match: {
          commenter: commenterId,
          receiverProfile: { $exists: true, $ne: null },
          createdAt: { $gte: since },
        },
      },
      {
        $group: {
          _id: "$receiverProfile",
          commentsCount: { $sum: 1 },
          latestComment: { $max: "$createdAt" },
        },
      },
      {
        $lookup: {
          from: profileCollName,
          localField: "_id",
          foreignField: "_id",
          as: "profile",
        },
      },
      { $unwind: { path: "$profile", preserveNullAndEmptyArrays: false } },
      {
        $project: {
          profileId: "$_id",
          commentsCount: 1,
          latestComment: 1,
          name: "$profile.name",
          tag_line: "$profile.tag_line",
          followers: { $ifNull: ["$profile.followers", 0] },
        },
      },
      {
        $sort:
          typeof sort === "string" && sort.startsWith("-")
            ? { [sort.slice(1)]: -1 }
            : { [sort]: 1 },
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: lim }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const agg = await Comment.aggregate(pipeline).allowDiskUse(true);
    const facetResult = agg[0] || { data: [], totalCount: [] };
    const data = facetResult.data || [];
    const total =
      (facetResult.totalCount &&
        facetResult.totalCount[0] &&
        facetResult.totalCount[0].count) ||
      0;

    const resultData = data.map((d) => ({
      profileId: d.profileId ? String(d.profileId) : null,
      name: d.name || "",
      tag_line: d.tag_line || "",
      followers: Number(d.followers || 0),
      commentsCount: Number(d.commentsCount || 0),
      latestComment: d.latestComment
        ? new Date(d.latestComment).toISOString()
        : null,
      impressions: d.impressions === undefined ? "NA" : d.impressions,
    }));

    return {
      data: resultData,
      page: pageNum,
      limit: lim,
      total,
      totalPages: Math.ceil(total / lim) || 1,
    };
  } catch (err) {
    console.error("dashboardService.getTargets error:", {
      message: err.message,
      stack: err.stack,
      userId,
      period,
      page,
      limit,
      sort,
    });
    throw err;
  }
}

module.exports = { getMetrics, getTargets };
