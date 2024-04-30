const Goal = require("../models/goalModel");

const {
  validateTitle,
  validateDescription,
  validateUrgency,
  validateTitleUpdate,
  validateDescriptionUpdate,
  isValidObjectId,
} = require("../utils/goalsValidations");

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
  const { title, description, urgency } = req.body;

  if (validateTitle(title)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validateTitle(title),
    });
  }

  if (validateDescription(description)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validateDescription(description),
    });
  }

  if (validateUrgency(urgency)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validateUrgency(urgency),
    });
  }

  try {
    const goal = await Goal.create({
      user: req.user.id,
      title,
      description,
      urgency: urgency.toUpperCase(),
    });

    res
      .status(201)
      .json({ statusCode: 201, msg: "Goal created successfully!", data: goal });
  } catch (error) {
    return next("Error trying to create new goal");
  }
};

// Update goal
const updateGoal = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (title) {
    if (validateTitleUpdate(title)) {
      return res.status(400).json({
        statusCode: 400,
        msg: validateTitleUpdate(title),
      });
    }
  }

  if (description) {
    if (validateDescriptionUpdate(description)) {
      return res.status(400).json({
        statusCode: 400,
        msg: validateDescriptionUpdate(description),
      });
    }
  }

  if (!title && !description) {
    return res.status(400).json({
      statusCode: 400,
      msg: "Title or description missing",
    });
  }

  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        statusCode: 400,
        msg: `ID: ${id} - Invalid format!`,
      });
    }

    const goal = await Goal.findById(id);

    console.log(goal);

    if (!goal) {
      return res.status(404).json({
        msg: `Goal with ID: ${id} not found!`,
      });
    }

    // Goal is not logged in user
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        statusCode: 401,
        msg: "You can not update a goal that is not yours!",
      });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      { title: title ?? title, description: description ?? description },
      { new: true }
    );

    res.status(200).json({
      statusCode: 200,
      msg: "Goal updated successfully!",
      data: updatedGoal,
    });
  } catch (error) {
    console.log(error.message);
    return next("Error trying to update goal");
  }
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
