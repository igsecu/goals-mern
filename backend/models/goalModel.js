const mongoose = require("mongoose");

// Goal Schema
const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      require: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    tasks: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
      default: [],
    },
    notes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
      default: [],
    },
    image: {
      type: String,
      default: null,
    },
    image_id: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
