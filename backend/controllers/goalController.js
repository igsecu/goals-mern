const Goal = require("../models/goalModel");
const Task = require("../models/taskModel");
const Note = require("../models/noteModel");

const fsExtra = require("fs-extra");

const {
  validateTitle,
  validateDescription,
  validateUrgency,
  validateTitleUpdate,
  validateDescriptionUpdate,
  validateUrgencyUpdate,
  isValidObjectId,
} = require("../utils/goalsValidations");

const { validateImageSize, validateFileType } = require("../utils/index");

const { uploadGoalImage, deleteImage } = require("../utils/cloudinary");

// Get low goals
const getLowGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({
      user: req.user.id,
      urgency: "LOW",
      isCompleted: false,
    })
      .sort("-createdAt")
      .populate({
        path: "tasks",
        options: {
          select: "id text status",
          sort: {
            createdAt: -1,
          },
        },
      })
      .populate({
        path: "notes",
        options: {
          select: "id text",
          sort: {
            createdAt: 1,
          },
        },
      })
      .select("-image_id -updatedAt");
    if (!goals.length) {
      return res.status(404).json({
        statusCode: 404,
        msg: "You do not have low urgency goals!",
      });
    }
    res.status(200).json({ statusCode: 200, data: goals });
  } catch (error) {
    return next("Error trying to get low urgency goals");
  }
};

// Get medium goals
const getMediumGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({
      user: req.user.id,
      urgency: "MEDIUM",
      isCompleted: false,
    })
      .sort("-createdAt")
      .populate({
        path: "tasks",
        options: {
          select: "id text status",
          sort: {
            createdAt: -1,
          },
        },
      })
      .populate({
        path: "notes",
        options: {
          select: "id text",
          sort: {
            createdAt: 1,
          },
        },
      })
      .select("-image_id -updatedAt");
    if (!goals.length) {
      return res.status(404).json({
        statusCode: 404,
        msg: "You do not have medium urgency goals!",
      });
    }
    res.status(200).json({ statusCode: 200, data: goals });
  } catch (error) {
    return next("Error trying to get medium urgency goals");
  }
};

// Get high goals
const getHighGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({
      user: req.user.id,
      urgency: "HIGH",
      isCompleted: false,
    })
      .sort("-createdAt")
      .populate({
        path: "tasks",
        options: {
          select: "id text status",
          sort: {
            createdAt: -1,
          },
        },
      })
      .populate({
        path: "notes",
        options: {
          select: "id text",
          sort: {
            createdAt: 1,
          },
        },
      })
      .select("-image_id -updatedAt");
    if (!goals.length) {
      return res.status(404).json({
        statusCode: 404,
        msg: "You do not have high urgency goals!",
      });
    }
    res.status(200).json({ statusCode: 200, data: goals });
  } catch (error) {
    return next("Error trying to get high urgency goals");
  }
};

// Get completed goals
const getCompletedGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({
      user: req.user.id,
      isCompleted: true,
    })
      .sort("-createdAt")
      .populate({
        path: "tasks",
        options: {
          select: "id text status",
          sort: {
            createdAt: -1,
          },
        },
      })
      .populate({
        path: "notes",
        options: {
          select: "id text",
          sort: {
            createdAt: 1,
          },
        },
      })
      .select("-image_id -updatedAt");
    if (!goals.length) {
      return res.status(404).json({
        statusCode: 404,
        msg: "You do not have completed goals!",
      });
    }
    res.status(200).json({ statusCode: 200, data: goals });
  } catch (error) {
    return next("Error trying to get completed goals");
  }
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
  const { urgency } = req.query;

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

  if (urgency) {
    if (validateUrgencyUpdate(urgency)) {
      return res.status(400).json({
        statusCode: 400,
        msg: validateUrgencyUpdate(urgency),
      });
    }
  }

  if (!title && !description && !urgency) {
    return res.status(400).json({
      statusCode: 400,
      msg: "Title, description or urgency missing",
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
        msg: "You can not update a goal that is not yours!",
      });
    }

    if (goal.isCompleted === true) {
      return res.status(400).json({
        statusCode: 400,
        msg: `You can not update a goal that is completed!`,
      });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      {
        title: title ?? title,
        description: description ?? description,
        urgency: urgency && urgency.toUpperCase(),
      },
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

// Update goal completed
const updateGoalCompleted = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        statusCode: 400,
        msg: `ID: ${id} - Invalid format!`,
      });
    }

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
        msg: "You can not update a goal that is not yours!",
      });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      {
        isCompleted: true,
      },
      { new: true }
    );

    res.status(200).json({
      statusCode: 200,
      msg: `You completed the Goal: ${updatedGoal.title}`,
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

  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        statusCode: 400,
        msg: `ID: ${id} - Invalid format!`,
      });
    }

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
      await Task.deleteMany({ goal: id });
      await Note.deleteMany({ goal: id });
      res
        .status(200)
        .json({ statusCode: 200, msg: "Goal deleted!", data: goal });
    }
  } catch (error) {
    return next("Error trying to delete a goal");
  }
};

// Get filtered goals
const getFilteredGoals = async (req, res, next) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({
      statusCode: 400,
      msg: "Query parameter is missing",
    });
  }

  try {
    const goals = await Goal.find({
      user: req.user.id,
      title: new RegExp(title, "i"),
    })
      .sort("-createdAt")
      .populate({
        path: "tasks",
        options: {
          select: "id text status",
          sort: {
            createdAt: -1,
          },
        },
      })
      .populate({
        path: "notes",
        options: {
          select: "id text",
          sort: {
            createdAt: 1,
          },
        },
      });
    if (!goals.length) {
      return res.status(404).json({
        statusCode: 404,
        msg: "Goals with these filters not found!",
      });
    }
    res.status(200).json({ statusCode: 200, data: goals });
  } catch (error) {
    return next("Error trying to get filtered goals");
  }
};

// Update goal image
const updateGoalImage = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        statusCode: 400,
        msg: `ID: ${id} - Invalid format!`,
      });
    }

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
        msg: "You can not update a goal that is not yours!",
      });
    }

    if (goal.isCompleted === true) {
      return res.status(400).json({
        statusCode: 400,
        msg: `You can not update a goal that is completed!`,
      });
    }

    if (req.files?.image) {
      if (await validateFileType(req.files.image.tempFilePath)) {
        const message = await validateFileType(req.files.image.tempFilePath);

        await fsExtra.unlink(req.files.image.tempFilePath);

        return res.status(400).json({
          statusCode: 400,
          msg: message,
        });
      }

      if (await validateImageSize(req.files.image.tempFilePath)) {
        const message = await validateImageSize(req.files.image.tempFilePath);

        await fsExtra.unlink(req.files.image.tempFilePath);

        return res.status(400).json({
          statusCode: 400,
          msg: message,
        });
      }

      const result = await uploadGoalImage(req.files.image.tempFilePath);

      await fsExtra.unlink(req.files.image.tempFilePath);

      if (goal.image_id !== null) {
        await deleteImage(goal.image_id);
      }

      const goalUpdated = await Goal.findByIdAndUpdate(
        id,
        {
          image: result.secure_url,
          image_id: result.public_id,
        },
        { new: true }
      );

      const goalFound = await Goal.findById(id).select("-image_id");

      return res.status(200).json({
        statusCode: 200,
        msg: "Image updated successfully!",
        data: goalFound,
      });
    } else {
      return res.status(400).json({
        statusCode: 400,
        msg: "Image file is missing!",
      });
    }
  } catch (error) {
    await fsExtra.unlink(req.files.image.tempFilePath);
    console.log(error.message);
    return next("Error trying to update goal image");
  }
};

// Delete goal image
const deleteGoalImage = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        statusCode: 400,
        msg: `ID: ${id} - Invalid format!`,
      });
    }

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
        msg: "You can not update a goal that is not yours!",
      });
    }

    if (goal.isCompleted === true) {
      return res.status(400).json({
        statusCode: 400,
        msg: `You can not update a goal that is completed!`,
      });
    }

    if (goal.image_id !== null) {
      await deleteImage(goal.image_id);

      const updatedGoal = await Goal.findByIdAndUpdate(
        id,
        {
          image: null,
          image_id: null,
        },
        { new: true }
      );

      return res.status(200).json({
        statusCode: 200,
        msg: "Image deleted successfully!",
        data: updatedGoal,
      });
    }

    res.status(400).json({
      statusCode: 400,
      msg: "Goal does not have image to delete!",
    });
  } catch (error) {
    console.log(error.message);
    return next("Error trying to delete goal image");
  }
};

module.exports = {
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
  deleteGoalImage,
};
