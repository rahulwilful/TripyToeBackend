const mongoose = require("mongoose");

const { Schema } = mongoose;

const activitiesSchema = new Schema({
  activity_time: {
    type: String,
  },
  activity: {
    type: String,
  },
});

const itineraryDaysSchema = new Schema({
  day_no: {
    type: String,
  },
  day_sub: {
    type: String,
  },
  other_detail: {
    type: String,
  },
  activities: [activitiesSchema],
});

const itinerarysSchema = new Schema({
  destination: {
    type: String,
    required: true,
  },
  no_of_days: {
    type: Number,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  no_of_ppl: {
    type: Number,
    required: true,
  },
  preference: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  itineraryDays: [itineraryDaysSchema],
});

const UserSchema = new Schema({
  profile: {
    type: String,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
  },
  mobile_no: {
    type: Number,
  },
  mobile_no_verified: {
    type: Boolean,
    default: false,
  },
  whatsapp_status: {
    type: Boolean,
    default: false,
  },
  whatsapp_no: {
    type: Number,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  approved: {
    type: Boolean,
    default: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  otp: {
    type: Number,
  },
  token: {
    type: String,
  },

  itinerarys: [itinerarysSchema],
});

module.exports = mongoose.model("User", UserSchema);

/* const mongoose = require("mongoose");

const { Schema } = mongoose;

const itinerarysSchema = new Schema({
  destination: {
    type: String,
    required: true,
  },
  no_of_days: {
    type: Number,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  no_of_ppl: {
    type: Number,
    required: true,
  },
  preference: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema({
  profile: {
    type: String,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
  },
  mobile_no: {
    type: Number,
  },
  mobile_no_verified: {
    type: Boolean,
    default: false,
  },
  whatsapp_status: {
    type: Boolean,
    default: false,
  },
  whatsapp_no: {
    type: Number,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  approved: {
    type: Boolean,
    default: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  otp: {
    type: Number,
  },
  token: {
    type: String,
  },

  itinerarys: [itinerarysSchema],
});

module.exports = mongoose.model("User", UserSchema);
 */
