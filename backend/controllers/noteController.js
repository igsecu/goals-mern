const Note = require("../models/noteModel");
const Goal = require("../models/goalModel");

const { validateText } = require("../utils/taskValidations");

const { isValidObjectId } = require("../utils/goalsValidations");

// Create note
const createNote = async (req, res, next) => {
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
        msg: "You can not add a note to a goal that is not yours!",
      });
    }

    if (goal.isCompleted === true) {
      return res.status(400).json({
        statusCode: 400,
        msg: `You can not add a note to a completed goal!`,
      });
    }

    const noteCreated = await Note.create({
      text,
      user: req.user.id,
      goal: goalId,
    });

    await Goal.findByIdAndUpdate(goalId, {
      notes: [...goal.notes, noteCreated],
    });

    res.status(201).json({
      statusCode: 201,
      msg: "Note created successfully!",
      data: noteCreated,
    });
  } catch (error) {
    return next("Error trying to create a new note");
  }
};

// Delete Note
const deleteNote = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        statusCode: 400,
        msg: `ID: ${id} - Invalid format!`,
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        statusCode: 404,
        msg: `Note with ID: ${id} not found!`,
      });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({
        statusCode: 401,
        msg: "You can not delete a note that is not yours!",
      });
    }

    const goal = await Goal.findById(note.goal);

    if (goal.isCompleted === true) {
      return res.status(400).json({
        statusCode: 400,
        msg: "You can not delete a note of a goal that is completed!",
      });
    }

    const noteDeleted = await note.deleteOne();

    if (noteDeleted.deletedCount === 1) {
      await Goal.findByIdAndUpdate(id, {
        notes: goal.notes.filter((n) => n._id !== id),
      });

      res
        .status(200)
        .json({ statusCode: 200, msg: "Note deleted!", data: note });
    }
  } catch (error) {
    console.log(error);
    return next("Error trying to delete a note");
  }
};

module.exports = {
  createNote,
  deleteNote,
};
