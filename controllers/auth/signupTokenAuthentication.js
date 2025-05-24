const pool = require("../../db");
const jwt = require("jsonwebtoken");

const signupTokenAuthentication = async (req, res, next) => {
  const { email } = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Expect "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      message: "signup token is valid",
      user: { id: decoded.id },
    });
  } catch (err) {
    await pool.query("DELETE FROM user_web WHERE email = $1", [email]);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = signupTokenAuthentication;
