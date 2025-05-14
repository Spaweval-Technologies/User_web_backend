const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const checkUserExists = require("../middleware/checkUserExists");

router.post("/signup", checkUserExists, signup);
router.post("/login", login);

module.exports = router;
