const httpStatus = require("http-status").default;
const { dashboardService } = require("../services");

exports.getMetrics = async (req, res) => {
  const userId = req.user._id;
  const { period = "7d" } = req.query;
  const metrics = await dashboardService.getMetrics(userId, period);
  res.status(httpStatus.OK).json(metrics);
};

exports.getTargets = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const {
      period = "15d",
      page = "1",
      limit = "10",
      sort = "-commentsCount",
    } = req.query;

    const opts = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sort,
    };
    const result = await dashboardService.getTargets(userId, period, opts);
    return res.status(httpStatus.OK).json(result);
  } catch (err) {
    next(err);
  }
};
