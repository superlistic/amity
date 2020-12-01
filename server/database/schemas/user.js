const { Schema } = require('mongoose');

module.exports = new Schema({
  userId: String,
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
  suggestions: {},
  updated: { type: Number, default: Date.now() },
});
