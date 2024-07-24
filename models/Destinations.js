const mongoose = require("mongoose");

const { Schema } = mongoose;

const destinationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  where: {
    type: String,
  },
  start_month: {
    type: String,
    required: true,
  },
  end_month: {
    type: String,
    required: true,
  },
  tags: [String],
  category: {
    type: String,
    required: true,
  },
  how_to_reach: {
    type: String,
  },
  about: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Destination", destinationSchema);
