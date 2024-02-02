const mongoose = require("mongoose");

const { Schema } = mongoose;

const activitySchema = new Schema({
  activity_time: {
    type: String,
    required: true,
  },

  activity: {
    type: String,
    required: true,
  },
});

const itinerarySchema = new Schema({
  day_no: {
    type: String,
    required: true,
  },

  day_sub: {
    type: String,
    required: true,
  },

  other_detail: {
    type: String,
    required: true,
  },
  activities: [activitySchema],
});

const destinationSchema = new Schema({
  itinerary: [itinerarySchema],
  message: {
    type: String,
  },
  name_entity: [String],
});

module.exports = mongoose.model("Destination", destinationSchema);
