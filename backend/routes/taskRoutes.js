const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createTask,
  updateTaskCompleted,
  updateTaskProgress,
  deleteTask,
} = require("../controllers/taskController");

// Create task
router.post("/", protect, createTask);
// Update task progress
router.put("/:id/status/progress", protect, updateTaskProgress);
// Update task completed
router.put("/:id/status/completed", protect, updateTaskCompleted);
// Delete task
router.delete("/:id", protect, deleteTask);

module.exports = router;
