const { Schema } = require('mongoose');

module.exports = new Schema({
  id: String,
  fbToken: String,
  gToken: String,
  username: String,
  email: String,
  passhash: String,
  callHistory: {},
  settings: {},
  usedSuggestions: {},
  updated: { type: Date, default: Date.now },
});
