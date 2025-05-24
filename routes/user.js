const express = require("express");
const router = express.Router();

//middleware
const authenticateToken = require("../middleware/tokenAuthentication");
const validate = require("../middleware/validate");

//controllers
const getUserByEmail = require("../controllers/user/getUserByEmail");
const updateUser = require("../controllers/user/updateUser");
const { updateUserSchema } = require("../validations/userValidations");

router.get("/:email", authenticateToken, getUserByEmail);
router.put("/:id", validate(updateUserSchema), authenticateToken, updateUser);

module.exports = router;
