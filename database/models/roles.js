const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["Admin", "Worker"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Roles", schema);
