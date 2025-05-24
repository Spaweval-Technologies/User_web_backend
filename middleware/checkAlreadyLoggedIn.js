const jwt = require("jsonwebtoken");

const checkAlreadyLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.status(200).json({
        message: "User already logged in",
        user: { id: decoded.id },
      });
    } catch (err) {
      // Token is invalid or expired; allow login to proceed
      next();
    }
  } else {
    // No token present, continue to login
    next();
  }
};

module.exports = { checkAlreadyLoggedIn };
