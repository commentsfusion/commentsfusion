// controllers/commentController.js
const httpStatus = require("http-status").default;
const { commentService } = require("../services");

exports.createComment = async (req, res, next) => {
  try {
    const commenterId = req.user._id;
    const { receiverLinkedInUsername, postContent, commentText } = req.body;

    const comment = await commentService.createComment({
      commenterId,
      receiverLinkedInUsername,
      postContent,
      commentText,
    });

    res.status(httpStatus.CREATED).json(comment);
  } catch (err) {
    next(err);
  }
};

exports.listComments = async (req, res, next) => {
  try {
    const {
      page = "1",
      limit = "5",
      status,
      account,
      from,
      to,
      sort = "-createdAt",
    } = req.query;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const commenterId = String(req.user._id);

    const options = {
      commenterId,
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      status,
      from,
      to,
      sort,
    };

    const result = await commentService.listComments(options);
    return res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};