const path = require('path');
const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

// 1) Define your environment variables and their validation rules
const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
  PORT: Joi.number().default(3000),

  MONGO_URI_DEV: Joi.string().uri().required().description('MongoDB connection URI for development'),
  
  JWT_SECRET: Joi.string().required().description('Secret key for signing JWTs'),
  JWT_EXPIRES_IN: Joi.string().default('30m').description('JWT expiration (e.g. "30m", "1h")'),

  RECAPTCHA_SECRET_KEY: Joi.string().required().description('Google Recaptcha secret key'),

  SMTP_HOST: Joi.string().hostname().required().description('SMTP server hostname'),
  SMTP_PORT: Joi.number().default(587).description('SMTP server port'),
  SMTP_SECURE: Joi.boolean().default(false).description('Use TLS/SSL for SMTP?'),
  SMTP_USER: Joi.string().required().description('SMTP auth user'),
  SMTP_PASS: Joi.string().required().description('SMTP auth password'),
  EMAIL_FROM: Joi.string().email().required().description('Default `from` address for outgoing emails'),
})
  .unknown() // allow other vars if you need
  .required();

// 2) Validate process.env against the schema
const { value: envVars, error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
  throw new Error(`❌ Config validation error: ${error.message}`);
}

// 3) Export a structured config object
module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,

  mongo: {
    uri: envVars.MONGO_URI_DEV + (envVars.NODE_ENV === 'test' ? '-test' : ''),
  },

  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },

  recaptcha: {
    secretKey: envVars.RECAPTCHA_SECRET_KEY,
  },

  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      secure: envVars.SMTP_SECURE,
      auth: {
        user: envVars.SMTP_USER,
        pass: envVars.SMTP_PASS,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};

/*
// Load environment variables from .env file
dotenv.config();

module.exports = {
  mongoURI: process.env.MONGO_URI_DEV,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  port: process.env.PORT || 3000,
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY
};
*/