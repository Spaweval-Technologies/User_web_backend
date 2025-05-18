const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserByEmail,
  updateUser,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:id", getUserByEmail);
router.put("/:id", updateUser);
module.exports = router;
