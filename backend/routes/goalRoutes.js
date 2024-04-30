const express = require("express");
const router = express.Router();

const {
  getLowGoals,
  getMediumGoals,
  getHighGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  getCompletedGoals,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

// Get completed goals
router.get("/completed", protect, getCompletedGoals);
// Get high urgency goals
router.get("/urgency/high", protect, getHighGoals);
// Get medium urgency goals
router.get("/urgency/medium", protect, getMediumGoals);
// Get low urgency goals
router.get("/urgency/low", protect, getLowGoals);
// Create new goal
router.post("/", protect, createGoal);
// Update goal
router.put("/:id", protect, updateGoal);
// Delete goal
router.delete("/:id", protect, deleteGoal);

module.exports = router;
