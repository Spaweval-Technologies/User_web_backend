const pool = require("../db");

const getUsers = async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM user_web");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;

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

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

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

module.exports = { getUsers, getUserByEmail, updateUser };
