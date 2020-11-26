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
const { env } = process;

// SOCKET.IO
const server = require('http').createServer(app);
websocketListener(server);

// MIDDLEWARE
// TODO: REMOVE CORS
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(jwtMiddle);

// INIT
if (env.DEBUG_NO_MONGO !== '1') {
  Promise.all([Log(), User()]).then(([logs, users]) => {
    app.use(logger(logs));
    app.use('/api/logs', logRouter(logs));
    app.use('/api/login', loginRouter(users));
  });
} else {
  console.log(chalk.bgRed('- DEBUG -'), chalk.red('no mongo db connected'));
  app.use(logger());
}

// ROUTE FOR OBTAINING SIGNED JWTs
if (env.DEBUG_JWT_ROUTE === '1') {
  console.log(
    chalk.bgRed('- DEBUG -'),
    chalk.red('../jwt will blindly give verified token')
  );
  const { signer } = require('./jwt');
  let count = 0;
  app.get('/jwt/', (req, res) => {
    console.log(chalk.grey(req.id), chalk.green('given jwt:'), 'test-' + count);
    res.cookie(
      'x-access-token',
      signer({ userId: 'test-' + count++ }, { httpOnly: true })
    );
    res.send('x-access-token');
  });
}
// ROUTE FOR webRTC TESTING
if (env.DEBUG_TEST_ROUTE === '1') {
  console.log(
    chalk.bgRed('- DEBUG -'),
    chalk.red('(webRTC-test) is availible at ../test')
  );
  app.use('/test', express.static('public'));
}

// ROUTES
app.use(
  '/static/',
  express.static(path.join(__dirname, '../client/build/static'))
);

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

// HASH
// const { SHA512 } = require('crypto-js');
// const sha512 = require('crypto-js/SHA512');
// console.log(sha512('viktor@styldesign.sepassword').toString());
