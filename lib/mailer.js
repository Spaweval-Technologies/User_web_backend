const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, // true for 465, false for other ports
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Failed:", error);
  } else {
    console.log("SMTP Server is ready");
  }
});

const sendWelcomeEmail = async (to, username, link, otp) => {
  await transporter.sendMail({
    from: `"My App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to My App!",
    html: `<p>Hello ${username},</p><p>Thank you for signing up!</p><strong>OTP: ${otp}</strong><p>Please verify your email by clicking the link below:</p><p><a href="${link}">Verify Email</a></p><p>Best regards,<br>My App Team</p>`,
  });
};

const sendSignupEmail = async (to, username, link) => {
  await transporter.sendMail({
    from: `"My App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to My App!",
    html: `<p>Hello ${username},</p><p>Thank you for signing up!</p><p>Verified your email Successfully!</p><p>To see website<a href="${link}">Click Here</a></p><p>Best regards,<br>My App Team</p>`,
  });
};

module.exports = {
  sendWelcomeEmail,
  transporter,
  sendSignupEmail,
};
