const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    task: String,
    status: {
      type: String,
      enum: ["assigned", "in-progress", "completed"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Jobs", schema);
