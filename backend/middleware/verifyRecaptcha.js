// middleware/verifyRecaptcha.js
const { verifyToken } = require('../utils/recaptcha');

function verifyRecaptcha(actionName) {
  return async function (req, res, next) {
    try {
      const token = req.body.recaptchaToken;
      await verifyToken(token, actionName);
      next();
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA validation failed',
        errors: err.details || err.message,
      });
    }
  };
}

module.exports = verifyRecaptcha;
