const express = require("express");
const router = express.Router();

const fileUpload = require("express-fileupload");

const {
  getLowGoals,
  getMediumGoals,
  getHighGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  getCompletedGoals,
  updateGoalCompleted,
  getFilteredGoals,
  updateGoalImage,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

// Get filtered goals
router.get("/filter", protect, getFilteredGoals);
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
// Update user image
router.put(
  "/:id/image",
  fileUpload({
    useTempFiles: true,
    tempFileDir: `${__dirname}/../uploads`,
  }),
  protect,
  updateGoalImage
);
// Update goal completed
router.put("/:id/completed", protect, updateGoalCompleted);
// Update goal
router.put("/:id", protect, updateGoal);
// Delete goal
router.delete("/:id", protect, deleteGoal);

module.exports = router;
