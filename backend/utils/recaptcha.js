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

   console.log("🔍 reCAPTCHA response:", data)
  if (!data.success) {
    const err = new Error("reCAPTCHA validation failed");
    err.details = data["error-codes"];
    throw err;
  }
  if (typeof data.score === "number" && data.score < 0.5) {
    const err = new Error("Low reCAPTCHA score");
    err.details = { score: data.score };
    throw err;
  }
  if (expectedAction && data.action !== expectedAction) {
    throw new Error(`Unexpected reCAPTCHA action: ${data.action}`);
  }
  return data;
}

module.exports = { verifyToken };
