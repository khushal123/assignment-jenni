const mongoose = require("mongoose");
const { generateHash } = require("../../utils/hash")

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
      enum: ["admin", "worker"],
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

schema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  // const rounds = process.env === "test" ? 1 : 9;
  generateHash(this.password).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
});

module.exports = mongoose.model("Users", schema);
