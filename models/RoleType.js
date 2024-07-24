const mongoose = require("mongoose");

const { Schema } = mongoose;

const RoleTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("RoleType", RoleTypeSchema);
