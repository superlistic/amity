require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const { logger } = require('./logger');
const { jwtMiddle } = require('./jwt');
const { MeetingHandler } = require('./MeetingHandler');
const {
  logRouter,
  loginRouter,
  logoutRouter,
  registerRouter,
  meetingsRouter,
} = require('./routes');
const { Log, User } = require('./database');
const { websocketListener } = require('./socketListener');
const Jogger = require('./Jogger');
const chalk = require('chalk');
const log = new Jogger();
const elog = new Jogger(chalk.yellow('[express]'));
const { env } = process;
const meetings = new MeetingHandler();
const server = require('http').createServer(app);

// MIDDLEWARE
app.use(cookieParser());
app.use(bodyParser.json());
app.use(jwtMiddle);

const addStatic = app => {
  // ROUTE FOR OBTAINING SIGNED JWTs
  if (env.DEBUG_JWT_ROUTE === '1') {
    log.debug('../jwt will blindly give verified token');
    const { signer } = require('./jwt');
    let count = 0;
    app.get('/jwt/', (req, res) => {
      log.info(req.id + ' given jwt:', 'test-' + count);
      const jwt = signer({ userId: 'test-' + count++ });
      res.cookie('x-access-token', jwt, {
        httpOnly: true,
        sameSite: 'strict',
      });
      log.debug('jwt is', jwt);
      res.send('x-access-token');
    });
  }
  // ROUTE FOR webRTC TESTING
  if (env.DEBUG_TEST_ROUTE === '1') {
    log.debug('(webRTC-test) is availible at ../test');
    app.use('/test', express.static('public'));
  }

  // ROUTES
  app.use(
    '/static/',
    express.static(path.join(__dirname, env.BUILD_PATH, '/static'))
  );

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, env.BUILD_PATH, '/index.html'));
  });
  // SERVER INIT
  server.listen(env.PORT, () => {
    elog.mute('Build path is: ' + env.BUILD_PATH);
    elog.ok('listening to port', env.PORT + '.');
  });
};

// INIT
Promise.all([Log(), User()]).then(([logs, users]) => {
  // SOCKET.IO
  websocketListener(server, meetings, users);

  app.use(logger(logs));
  app.use('/api/logs', logRouter(logs));
  app.use('/api/login', loginRouter(users));
  app.use('/api/register', registerRouter(users));
  app.use('/api/meetings', meetingsRouter(meetings));
  app.use('/api/logout', logoutRouter());
  addStatic(app);
});
