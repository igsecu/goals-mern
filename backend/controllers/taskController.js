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

    await Goal.findByIdAndUpdate(goalId, {
      tasks: [...goal.tasks, taskCreated],
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

// Update Task Progress
const updateTaskProgress = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      statusCode: 400,
      msg: `ID: ${id} - Invalid format!`,
    });
  }

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        statusCode: 404,
        msg: `Task with ID: ${id} not found!`,
      });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        statusCode: 401,
        msg: "You can not update a task that is not yours!",
      });
    }

    if (task.status === "COMPLETED") {
      return res.status(400).json({
        statusCode: 400,
        msg: "You can not update a task that is completed!",
      });
    }

    const goal = await Goal.findById(task.goal);

    if (goal.isCompleted === true) {
      return res.status(400).json({
        statusCode: 400,
        msg: "You can not update a task of a goal that is completed!",
      });
    }

    const updateTask = await Task.findByIdAndUpdate(
      id,
      {
        status: "IN PROGRESS",
      },
      { new: true }
    );

    res.status(200).json({
      statusCode: 200,
      msg: "Task updated successfully!",
      data: updateTask,
    });
  } catch (error) {
    return next("Error trying to update task");
  }
};

// Update Task Completed
const updateTaskCompleted = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      statusCode: 400,
      msg: `ID: ${id} - Invalid format!`,
    });
  }

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        statusCode: 404,
        msg: `Task with ID: ${id} not found!`,
      });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        statusCode: 401,
        msg: "You can not update a task that is not yours!",
      });
    }

    const goal = await Goal.findById(task.goal);

    if (goal.isCompleted === true) {
      return res.status(400).json({
        statusCode: 400,
        msg: "You can not update a task of a goal that is completed!",
      });
    }

    const updateTask = await Task.findByIdAndUpdate(
      id,
      {
        status: "COMPLETED",
      },
      { new: true }
    );

    const tasks = await Task.find({
      goal: task.goal,
    });

    res.status(200).json({
      statusCode: 200,
      msg: "Task updated successfully!",
      data: updateTask,
    });
  } catch (error) {
    return next("Error trying to update task");
  }
};

// Delete Task
const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        statusCode: 400,
        msg: `ID: ${id} - Invalid format!`,
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        statusCode: 404,
        msg: `Task with ID: ${id} not found!`,
      });
    }

    // Goal is not logged in user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        statusCode: 401,
        msg: "You can not delete a task that is not yours!",
      });
    }

    const goal = await Goal.findById(task.goal);

    if (goal.isCompleted === true) {
      return res.status(400).json({
        statusCode: 400,
        msg: "You can not delete a task of a goal that is completed!",
      });
    }

    const taskDeleted = await task.deleteOne();

    if (taskDeleted.deletedCount === 1) {
      await Goal.findByIdAndUpdate(id, {
        tasks: goal.tasks.filter((t) => t._id !== id),
      });

      res
        .status(200)
        .json({ statusCode: 200, msg: "Task deleted!", data: task });
    }
  } catch (error) {
    return next("Error trying to delete a task");
  }
};

module.exports = {
  createTask,
  updateTaskProgress,
  updateTaskCompleted,
  deleteTask,
};
