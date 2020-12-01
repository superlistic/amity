require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const path = require('path');
const { logger } = require('./logger');
const { jwtMiddle } = require('./jwt');
const { logRouter, loginRouter, registerRouter } = require('./routes');
const { Log, User } = require('./database');
const { websocketListener } = require('./socketListener');
const Jogger = require('./Jogger');
const chalk = require('chalk');
const log = new Jogger();
const elog = new Jogger(chalk.yellow('[express]'));
const { env } = process;

// SOCKET.IO
const server = require('http').createServer(app);
websocketListener(server);

// MIDDLEWARE
// TODO: REMOVE CORS
// app.use(cors());
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
if (env.DEBUG_NO_MONGO !== '1') {
  Promise.all([Log(), User()]).then(([logs, users]) => {
    app.use(logger(logs));
    app.use('/api/logs', logRouter(logs));
    app.use('/api/login', loginRouter(users));
    app.use('/api/register', registerRouter(users));
    addStatic(app);
  });
} else {
  log.debug('mongo db NOT connected');
  app.use(logger());
  addStatic(app);
}
class Client {
  constructor(uid, socket) {
    this.userId = uid;
    this.socket = socket;
  }
}

// HASH
// const { SHA512 } = require('crypto-js');
// const sha512 = require('crypto-js/SHA512');
// log.info(sha512('viktor@styldesign.sepassword').toString());
