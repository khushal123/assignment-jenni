const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: String,
    name: String,
    role: {
      type: String,
      enum: ["Admin", "Worker"],
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  }
);
module.exports = mongoose.model("Users", schema);
