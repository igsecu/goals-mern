const Goal = require("../models/goalModel");

// Get goals
const getGoals = async (req, res, next) => {
  const goals = await Goal.find();
  res.status(200).json({ data: goals });
};

// Create goal
const createGoal = async (req, res, next) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      msg: "Text is missing",
    });
  }

  const goal = await Goal.create({
    text,
  });

  res.status(200).json({ msg: "Goal created successfully!", data: goal });
};

// Update goal
const updateGoal = async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;

  const goal = await Goal.findById(id);

  if (!goal) {
    return res.status(404).json({
      msg: `Goal with ID: ${id} not found!`,
    });
  }

  const updatedGoal = await Goal.findByIdAndUpdate(id, text, { new: true });

  res
    .status(200)
    .json({ msg: "Goal Updated Successfully!", data: updatedGoal });
};

// Delete goal
const deleteGoal = async (req, res, next) => {
  const { id } = req.params;

  const goal = await Goal.findById(id);

  if (!goal) {
    return res.status(404).json({
      msg: `Goal with ID: ${id} not found!`,
    });
  }

  await goal.remove();

  res.status(200).json({ msg: "Goal deleted!", data: goal });
};

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
