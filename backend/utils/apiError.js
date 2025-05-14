// utils/apiError.js
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    // mark operational so you don’t accidentally leak stack traces
    this.isOperational = true;
  }
}

module.exports = ApiError;