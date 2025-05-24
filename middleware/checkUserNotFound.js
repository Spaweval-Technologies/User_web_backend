const pool = require("../db");

const checkUserNotFound = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await pool.query("SELECT * FROM user_web WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = checkUserNotFound;
