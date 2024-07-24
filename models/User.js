const mongoose = require("mongoose");
const RoleType = require("./RoleType.js");

const { Schema } = mongoose;

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
  role_type: {
    type: "ObjectId",
    ref: "RoleType",
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
});

module.exports = mongoose.model("User", UserSchema);
