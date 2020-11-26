require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const { logger } = require('./logger');
const { jwtMiddle } = require('./jwt');
const { logRouter, loginRouter } = require('./routes');
const { Log, User } = require('./database');
const { websocketListener } = require('./socketListener');
const chalk = require('chalk');
const { SHA512 } = require('crypto-js');
const { env } = process;

// SOCKET.IO
const server = require('http').createServer(app);
websocketListener(server);

// INIT
Promise.all([Log(), User()]).then(([logs, users]) => {
  //   // MIDDLEWARE
  //   // TODO: REMOVE CORS
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(jwtMiddle);
  // app.use(logger());
  app.use(logger(logs));
  // ROUTES
  app.use('/api/logs', logRouter(logs));
  app.use('/api/login', loginRouter(users));
  app.use(
    '/static/',
    express.static(path.join(__dirname, '../client/build/static'))
  );

  // TODO DEBUG
  const { signer } = require('./jwt');
  let count = 0;
  app.get('/jwt/', (req, res) => {
    res.cookie(
      'x-access-token',
      signer({ userId: 'test-' + count++ }, { httpOnly: true })
    );
    res.send('x-access-token');
    console.log(chalk.grey(req.id), chalk.bgGreen('test jwt'), count);
  });
  // TODO DEBUG END

  app.use('/test', express.static('public'));
  app.get('*', (req, res) => {
    // console.log(path.join(__dirname, '../client/build/index.html'));
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

// HASH
// const sha512 = require('crypto-js/SHA512');
// console.log(sha512('viktor@styldesign.sepassword').toString());
