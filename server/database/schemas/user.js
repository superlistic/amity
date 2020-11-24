const { Schema } = require('mongoose');

module.exports = new Schema({
  userID: String,
  facebookToken: String,
  googleToken: String,
  username: String,
  email: String,
  passwordHash: String,
  bio: String,
  tagline: String,
  avatar: String,
  callHistory: {},
  settings: {},
  usedSuggestions: {},
  updated: { type: Date, default: Date.now },
});
