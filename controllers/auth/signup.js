const pool = require("../../db");
const jwt = require("jsonwebtoken");
const sendWelcomeEmail = require("../../lib/mailer"); // Assuming you have a queue for sending emails

const signup = async (req, res) => {
  const { name, email, password, mobile_number } = req.body;

  if (!name || !email || !password || !mobile_number) {
    // Check if all required fields are provided
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Generate 6-digit OTP and expiration
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // Create verification token
    const verificationToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const newUser = await pool.query(
      "INSERT INTO user_web (name, email, password, mobile_number, signup_start_time, signup_otp, signup_otp_expires, signup_token, signup_email_verified, email_verified ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, name, email",
      [
        name,
        email,
        password,
        mobile_number,
        new Date(Date.now()),
        otp,
        otpExpiresAt,
        verificationToken,
        false,
        false,
      ]
    );

    // Email verification link
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    await sendWelcomeEmail(email, name, verificationLink, otp);

    res.status(200).json({
      user: newUser.rows[0].email,
      code: "mailSent",
      token: verificationToken,
    });
  } catch (err) {
    console.error(err);

    if (err.message.includes("email")) {
      await pool.query("DELETE FROM user_web WHERE email = $1", [email]);
    }

    res.status(500).json({ error: "Signup failed" });
  }
};

module.exports = signup;
