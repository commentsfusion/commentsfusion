// middleware/auth.js
const { verifyToken } = require("../utils/auth");

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyToken(token);
    req.user = { id: payload.userId, role: paylonad.role };
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};