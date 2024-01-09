const mongoose = require("mongoose");
const User = require("./User.js");

const { Schema } = mongoose;

const SearchedSchema = new Schema({
  destination: {
    type: String,
  },
  no_of_days: {
    type: Number,
  },
  start_date: {
    type: Date,
  },
  no_of_ppl: {
    type: Number,
  },
  preference: {
    type: String,
  },
  budget: {
    type: Number,
  },
  userId: {
    type: "ObjectId",
    ref: "User",
    required: true,
  },
  search_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Searched", SearchedSchema);
