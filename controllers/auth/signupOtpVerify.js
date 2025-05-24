const pool = require("../../db");
const { sendSignupEmail } = require("../../lib/mailer");

const signupOtpVerify = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  try {
    const user = await pool.query("SELECT * FROM user_web WHERE email = $1", [
      email,
    ]);

    const storedOtp = user.rows[0]?.signup_otp;

    if (storedOtp && storedOtp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    } else {
      await sendSignupEmail(email, user.rows[0].name, process.env.FRONTEND_URL);
      await pool.query(
        "UPDATE user_web SET signup_otp = $1, signup_email_verified = $2, signup_stat_time = $3, signup_otp_expires = $4, signup_token = $5, email_verified = $6  WHERE email = $3",
        [0, true, 0, 0, "", true, email]
      );
      return res.status(200).json({ message: "OTP verified successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = signupOtpVerify;
