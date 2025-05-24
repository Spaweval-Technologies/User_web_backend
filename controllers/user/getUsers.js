const pool = require("../../db");

const getUsers = async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM user_web");
    await emailQueue.add("sendWelcomeEmail", {
      email: "poojashiroya99@gmail.com",
      username: "Pooja Korat",
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
