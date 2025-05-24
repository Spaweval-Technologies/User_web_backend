const pool = require("../../db");
const jwt = require("jsonwebtoken");

const foregetPasswordVerify = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const userResult = await pool.query(
      "SELECT * FROM user_web WHERE id = $1",
      [userId]
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid token" });
    }

    res.json({ message: "Token is valid" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error verifying token" });
  }
};

module.exports = foregetPasswordVerify;
