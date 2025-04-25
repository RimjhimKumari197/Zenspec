const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Only for development (Remove in production)
  },
  port: 587, // For TLS connection (recommended)
  secure: false,
});

module.exports = transporter;
