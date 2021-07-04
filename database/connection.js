const mongoose = require("mongoose");
const { DB } = require("../config/config");

mongoose.connect(DB.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
