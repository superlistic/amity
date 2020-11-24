require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { logger } = require('./logger');
const { jwtMiddle } = require('./jwt');
const { logRouter, loginRouter } = require('./routes');
const { Log, User } = require('./database');
const { env } = process;
const port = env.EXPRESS_PORT;
const chalk = require('chalk');

Promise.all([Log(), User()]).then(([logs, users]) => {
  // MIDDLEWARE
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(jwtMiddle);
  app.use(logger(logs));
  // ROUTES
  app.use('/api/logs', logRouter(logs));
  app.use('/api/login', loginRouter(users));
  app.use(express.static('../client/build'));

  // SERVER INIT
  app.listen(port, () => {
    console.log(
      chalk.greenBright(`[Express]`),
      chalk.green('listening to port'),
      port
    );
  });
});
