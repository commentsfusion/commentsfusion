// middleware/auth.js
const { verifyToken } = require('../utils/auth');
const httpStatus = require('http-status').default;

exports.protect = (req, res, next) => {
  // First try the HttpOnly cookie
  let token = req.cookies?.auth_token;

  // (Optional) fallback to header if you still support it
  if (!token) {
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authenticated' });
  }

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.userId, role: payload.role };
    next();
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Token invalid or expired' });
  }
};
