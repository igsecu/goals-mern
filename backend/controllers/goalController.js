// Get goals
const getGoals = async (req, res, next) => {
  res.status(200).json({ msg: "Get goals!" });
};

// Create goal
const createGoal = async (req, res, next) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      msg: "Text is missing",
    });
  }

  res.status(200).json({ msg: "Set goal!" });
};

// Update goal
const updateGoal = async (req, res, next) => {
  res.status(200).json({ msg: "Update goal!" });
};

// Delete goal
const deleteGoal = async (req, res, next) => {
  res.status(200).json({ msg: "Goal deleted!" });
};

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
