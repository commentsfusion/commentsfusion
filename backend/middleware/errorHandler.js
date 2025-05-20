// middleware/errorHandler.js
function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

function apiErrorHandler(err, req, res, next) {
  // If it's our ApiError, respect its status; otherwise 500
  const status = err.isOperational ? err.statusCode : 500;
  const message = err.isOperational
    ? err.message
    : "An unexpected error occurred";

  if (!err.isOperational) {
    console.error(err); // log internal stack
  }

  res.status(status).json({ message });
}

module.exports = { asyncHandler, apiErrorHandler };