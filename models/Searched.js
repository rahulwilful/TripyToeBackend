const mongoose = require("mongoose");
const User = require("./User.js");

const { Schema } = mongoose;

const SearchedSchema = new Schema({
  destination: {
    type: String,
  },
  end_date: {
    type: String,
  },
  start_date: {
    type: String,
  },
  no_of_ppl: {
    type: String,
  },
  preference: [String],
  budget: {
    type: String,
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
