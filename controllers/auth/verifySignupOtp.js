const pool = require("../db");

const verifySignupOtp = async (req, res) => {
  const { otp, email } = req.body;

  if (!otp || !email) {
    return res.status(400).json({ error: "OTP and email are required" });
  }

  try {
    // Verify the OTP (this is a placeholder, implement your own logic)
    const isValidOtp = await verifyOtp(email, otp);
    if (!isValidOtp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // If OTP is valid, proceed with the signup process
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = verifySignupOtp;
