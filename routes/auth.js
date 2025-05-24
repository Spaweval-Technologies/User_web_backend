const express = require("express");
const router = express.Router();

//middleware
const checkUserExists = require("../middleware/checkUserExists");
const validate = require("../middleware/validate");
const {
  signupSchema,
  loginSchema,
  userExistsSchema,
} = require("../validations/authValidations");
const authenticateToken = require("../middleware/tokenAuthentication");
const { checkAlreadyLoggedIn } = require("../middleware/checkAlreadyLoggedIn");

//controllers
const signup = require("../controllers/auth/signup");
const { login } = require("../controllers/auth/login");
const forgetPassword = require("../controllers/auth/forgetPassword");
const foregetPasswordVerify = require("../controllers/auth/forgetPasswordVerify");
const resetPassword = require("../controllers/auth/resetPassword");
const signupTokenAuthentication = require("../controllers/auth/signupTokenAuthentication");
const signupOtpVerify = require("../controllers/auth/signupOtpVerify");
const checkUserNotFound = require("../middleware/checkUserNotFound");

router.post(
  "/signup",
  validate(userExistsSchema),
  checkUserExists,
  validate(signupSchema),
  signup
);
router.get("/signup/verify/:token", signupTokenAuthentication);
router.post(
  "/signup/verify/otp",
  checkUserNotFound,
  signupTokenAuthentication,
  signupOtpVerify
);
router.post("/login", checkUserNotFound, validate(loginSchema), login);
router.post("/forget-password", checkUserNotFound, forgetPassword);
router.post(
  "/forget-password/verify",
  checkUserNotFound,
  foregetPasswordVerify
);
router.post("/reset-password", authenticateToken, resetPassword);

module.exports = router;
