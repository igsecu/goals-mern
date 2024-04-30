const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { createNote, deleteNote } = require("../controllers/noteController");

// Create note
router.post("/", protect, createNote);
// Delete note
router.delete("/:id", protect, deleteNote);

module.exports = router;
