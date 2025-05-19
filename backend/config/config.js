const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

module.exports = {
  mongoURI: process.env.MONGO_URI_DEV,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  port: process.env.PORT || 3000,
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY
};
