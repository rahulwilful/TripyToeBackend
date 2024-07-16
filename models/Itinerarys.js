const mongoose = require("mongoose");
const User = require("./User.js");

const { Schema } = mongoose;

const DayNameEntitySchema = new Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
});

const ActivitiesSchema = new Schema({
  activity_time: {
    type: String,
  },
  activity: {
    type: String,
  },
});

const DaySchema = new Schema({
  day_no: {
    type: String,
  },
  day_subject: {
    type: String,
  },
  other_detail: {
    type: String,
  },
  activities: [ActivitiesSchema],
  day_name_entity: [DayNameEntitySchema],
});

const ItineraryDaysSchema = new Schema({
  day: [DaySchema],

  modify: {
    type: Boolean,
    default: false,
  },
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
    type: String,
    required: true,
  },
  start_date: {
    type: String,
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
