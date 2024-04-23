const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");

// Get user data
router.get("/user", getUser);
// Authenticate user
router.post("/login", loginUser);
// Register user
router.post("/", registerUser);

module.exports = router;
