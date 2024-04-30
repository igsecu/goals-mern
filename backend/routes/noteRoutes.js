const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { createNote } = require("../controllers/noteController");

// Create note
router.post("/", protect, createNote);

module.exports = router;
