const pool = require("../../db");

// This function retrieves a user by their email address
const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const user = await pool.query("SELECT * FROM user_web WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getUserByEmail;
