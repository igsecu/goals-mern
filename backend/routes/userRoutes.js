const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// Get user data
router.get("/user", protect, getUser);
// Authenticate user
router.post("/login", loginUser);
// Register user
router.post("/", registerUser);

module.exports = router;
