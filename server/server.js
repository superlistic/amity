require('dotenv').config();
const express = require('express');
const { Logger } = require('./utils');
const app = express();

const port = process.env.API_PORT;
const logger = new Logger();
setTimeout(async () => {
  await logger.connect();
  app.use(logger.middleware);
  app.use(express.static('public'));

  app.listen(port, () => {
    console.log(`API is UP and listening to port ${port}`);
  });
}, 5000);
