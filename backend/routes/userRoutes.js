const express = require("express");
const router = express.Router();

const fileUpload = require("express-fileupload");

const {
  registerUser,
  loginUser,
  getUser,
  updateUserImage,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// Get user data
router.get("/user", protect, getUser);
// Authenticate user
router.post("/login", loginUser);
// Register user
router.post("/", registerUser);
// Update user image
router.put(
  "/image",
  fileUpload({
    useTempFiles: true,
    tempFileDir: `${__dirname}/../uploads`,
  }),
  protect,
  updateUserImage
);

module.exports = router;
