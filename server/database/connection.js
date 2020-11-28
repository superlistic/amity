const Jogger = require('../Jogger');
const log = new Jogger('MongoDB');
const mongoose = require('mongoose');

const connect = async (uri, user, pass, authSource, schemaName, schema) => {
  const options = {
    auth: {
      authSource,
    },
    user,
    pass,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  log.debug('check logging');
  log.info('Connecting with', options.user);
  const connection = await mongoose
    .createConnection(uri, options)
    .catch(err => {
      log.err('- connection error -', err);
      log.err('- connection error -', console.log(err));

      process.exit(1);
    });

  // TODO: why is this not printing?
  connection.on('connected', () => {
    log.ok('Connected to ', uri);
  });

  // If the connection throws an error
  connection.on('error', err => {
    log.err(err.name, console.log(err));
  });

  // When the connection is disconnected
  connection.on('disconnected', () => {
    log.warn('disconnected');
  });

  process.on('SIGINT', () => {
    connection.close(() => {
      log.info('App terminated, closing mongo connections');
      process.exit(0);
    });
  });
  const Model = connection.model(schemaName, schema);
  return Model;
};

module.exports = { connect };
