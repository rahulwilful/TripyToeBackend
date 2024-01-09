const mongoose = require("mongoose");

const { Schema } = mongoose;

const destinationSchema = new Schema({
  itinerary: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  name_entity: [String],
});

module.exports = mongoose.model("Destination", destinationSchema);
