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
  tags: [String],
  category: {
    type: String,
    required: true,
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
