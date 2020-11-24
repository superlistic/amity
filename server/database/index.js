const { env } = process;
const { connect } = require('./connection');
const logSchema = require('./schemas/log');
const userSchema = require('./schemas/user');

const Log = async () =>
  await connect(
    env.MONGO_URI,
    env.MONGO_LOG_USER,
    env.MONGO_LOG_PW,
    'admin',
    'Log',
    logSchema
  );
const User = async () =>
  await connect(
    env.MONGO_URI,
    env.MONGO_APP_USER,
    env.MONGO_APP_PW,
    'admin',
    'User',
    userSchema
  );
module.exports = { Log, User };
