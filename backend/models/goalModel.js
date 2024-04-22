const mongoose = require("mongoose");

// Goal Schema
const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
