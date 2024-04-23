const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

require("dotenv").config();

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({
        statusCode: 401,
        msg: "You are not authorized! Please login...",
      });
    }
  }
  res.status(401).json({
    statusCode: 401,
    msg: "You are not authorized! Please login...",
  });
};

module.exports = {
  protect,
};
