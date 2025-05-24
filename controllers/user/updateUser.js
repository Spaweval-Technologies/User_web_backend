const pool = require("../../db");

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email || !email.includes("@")) {
    return res.status(400).json({ error: "Name and valid email are required" });
  }

  try {
    const updatedUser = await pool.query(
      "UPDATE user_web SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = updateUser;
