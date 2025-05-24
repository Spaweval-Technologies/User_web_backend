const pool = require("../../db");

const getUserByToken = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(401).json({ error: "token required." });
  }

  try {
    const user = await pool.query(
      "SELECT * FROM user_web WHERE auth_token = $1",
      [token]
    );
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getUserByToken;
