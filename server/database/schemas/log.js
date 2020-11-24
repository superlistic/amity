const { Schema } = require('mongoose');

module.exports = new Schema({
  logType: String,
  time: { type: Date, default: Date.now },
  data: {},
});
