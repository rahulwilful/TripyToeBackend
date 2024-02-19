const mongoose = require("mongoose");
const User = require("./User.js");

const { Schema } = mongoose;

const ActivitiesSchema = new Schema({
  activity_time: {
    type: String,
  },
  activity: {
    type: String,
  },
});

const ItineraryDaysSchema = new Schema({
  day_no: {
    type: String,
  },
  day_sub: {
    type: String,
  },
  other_detail: {
    type: String,
  },
  activities: [ActivitiesSchema],
});

const ItinerarysSchema = new Schema({
  userId: {
    type: "ObjectId",
    ref: "User",
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  no_of_ppl: {
    type: String,
    required: true,
  },
  preference: [String],
  budget: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },

  itineraryDays: [ItineraryDaysSchema],
});

module.exports = mongoose.model("Itinerarys", ItinerarysSchema);
