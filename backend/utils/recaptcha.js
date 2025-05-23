// utils/recaptcha.js
const config = require("../config/config");

async function verifyToken(token, expectedAction) {
  if (!token) throw new Error("No reCAPTCHA token provided");

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${encodeURIComponent(config.RECAPTCHA_SECRET_KEY)}&response=${encodeURIComponent(token)}`,
  });
  const data = await res.json();

  if (!data.success) {
    const err = new Error("reCAPTCHA validation failed");
    err.details = data["error-codes"];
    throw err;
  }
  if (expectedAction && data.action !== expectedAction) {
    throw new Error(`Unexpected reCAPTCHA action: ${data.action}`);
  }
  return data;
}

module.exports = { verifyToken };
