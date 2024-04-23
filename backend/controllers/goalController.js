const Goal = require("../models/goalModel");

// Get goals
const getGoals = async (req, res, next) => {
  const goals = await Goal.find({ user: req.user.id });
  if (!goals.length) {
    return res.status(404).json({
      statusCode: 404,
      msg: "You do not have goals!",
    });
  }
  res.status(200).json({ statusCode: 200, data: goals });
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
    user: req.user.id,
    text,
  });

  res
    .status(201)
    .json({ statusCode: 201, msg: "Goal created successfully!", data: goal });
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

  if (!text) {
    return res.status(400).json({
      msg: "Text is missing",
    });
  }

  // Goal is not logged in user
  if (goal.user.toString() !== req.user.id) {
    return res.status(401).json({
      statusCode: 401,
      msg: "You can not update a goal that is not yours!",
    });
  }

  const updatedGoal = await Goal.findByIdAndUpdate(id, { text }, { new: true });

  res.status(200).json({
    statusCode: 200,
    msg: "Goal updated successfully!",
    data: updatedGoal,
  });
};

// Delete goal
const deleteGoal = async (req, res, next) => {
  const { id } = req.params;

  const goal = await Goal.findById(id);

  if (!goal) {
    return res.status(404).json({
      statusCode: 404,
      msg: `Goal with ID: ${id} not found!`,
    });
  }

  // Goal is not logged in user
  if (goal.user.toString() !== req.user.id) {
    return res.status(401).json({
      statusCode: 401,
      msg: "You can not delete a goal that is not yours!",
    });
  }

  const goalDeleted = await goal.deleteOne();

  if (goalDeleted.deletedCount === 1) {
    res.status(200).json({ statusCode: 200, msg: "Goal deleted!", data: goal });
  }
};

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
