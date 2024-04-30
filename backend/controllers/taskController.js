const Task = require("../models/taskModel");
const Goal = require("../models/goalModel");

const { validateText } = require("../utils/taskValidations");

const { isValidObjectId } = require("../utils/goalsValidations");

// Create task
const createTask = async (req, res, next) => {
  const { text, goalId } = req.body;

  if (validateText(text)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validateText(text),
    });
  }

  try {
    if (!goalId) {
      return res.status(400).json({
        statusCode: 400,
        msg: "goalId is missing",
      });
    }

    if (!isValidObjectId(goalId)) {
      return res.status(400).json({
        statusCode: 400,
        msg: `goalId: ${goalId} - Invalid format!`,
      });
    }

    const goal = await Goal.findById(goalId);

    if (!goal) {
      return res.status(404).json({
        statusCode: 404,
        msg: `Goal with ID: ${goalId} not found!`,
      });
    }

    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        statusCode: 401,
        msg: "You can not add a task to a goal that is not yours!",
      });
    }

    if (goal.isCompleted === true) {
      return res.status(400).json({
        statusCode: 400,
        msg: `You can not add a task to a completed goal!`,
      });
    }

    const taskCreated = await Task.create({
      text,
      user: req.user.id,
      goal: goalId,
    });

    res.status(201).json({
      statusCode: 201,
      msg: "Task created successfully!",
      data: taskCreated,
    });
  } catch (error) {
    return next("Error trying to create a new task");
  }
};

module.exports = { createTask };
