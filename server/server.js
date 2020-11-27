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
const Jogger = require('./Jogger');
const debug = new Jogger('DEBUG');
const elog = new Jogger('express');
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
    debug.debug('../jwt will blindly give verified token');
    const { signer } = require('./jwt');
    let count = 0;
    app.get('/jwt/', (req, res) => {
      debug.info(req.id + ' given jwt:', 'test-' + count);
      res.cookie(
        'x-access-token',
        signer({ userId: 'test-' + count++ }, { httpOnly: true })
      );
      res.send('x-access-token');
    });
  }
  // ROUTE FOR webRTC TESTING
  if (env.DEBUG_TEST_ROUTE === '1') {
    debug.debug('(webRTC-test) is availible at ../test');
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
    elog.ok('listening to port', env.PORT + '.');
    elog.mute('Build path is: ' + env.BUILD_PATH);
  });
};

// INIT
if (env.DEBUG_NO_MONGO !== '1') {
  Promise.all([Log(), User()]).then(([logs, users]) => {
    app.use(logger(logs));
    app.use('/api/logs', logRouter(logs));
    app.use('/api/login', loginRouter(users));
    addStatic(app);
  });
} else {
  debug.debug('mongo db NOT connected');
  app.use(logger());
  addStatic(app);
}
// HASH
// const { SHA512 } = require('crypto-js');
// const sha512 = require('crypto-js/SHA512');
// log.info(sha512('viktor@styldesign.sepassword').toString());
