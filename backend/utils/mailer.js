// utils/mailer.js
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT || 587,
  secure: process.env.SECURE,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendVerificationMail(email, code) {
  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your verification code",
      text: `Your signup code is ${code}. It expires in 5 minutes.`,
    })
    .catch((err) => console.error("Email failed:", err));
}

module.exports = { sendVerificationMail };
