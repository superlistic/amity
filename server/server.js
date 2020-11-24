require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const { logger } = require('./logger');
const { jwtMiddle } = require('./jwt');
const { logRouter, loginRouter, connectionRouter } = require('./routes');
const { Log, User } = require('./database');
const { websocket } = require('./socket');
const chalk = require('chalk');
const { env } = process;

const sha512 = require('crypto-js/sha512');
console.log(sha512('johan@styldesign.se' + 'password').toString());

// SOCKET.IO
const server = require('http').createServer(app);
websocket(server);

// INIT
Promise.all([Log(), User()]).then(([logs, users]) => {
  // MIDDLEWARE
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(jwtMiddle);
  app.use(logger(logs));
  // TODO: REMOVE CORS
  // ROUTES
  app.use('/api/logs', logRouter(logs));
  app.use('/api/login', loginRouter(users));
  app.use(
    '/static/',
    express.static(path.join(__dirname, '../client/build/static'))
  );
  app.get('*', (req, res) => {
    console.log(path.join(__dirname, '../client/build/index.html'));
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  // SERVER INIT
  server.listen(env.PORT, () => {
    console.log(
      chalk.greenBright(`[Express]`),
      chalk.green('listening to port'),
      env.PORT
    );
  });
});
