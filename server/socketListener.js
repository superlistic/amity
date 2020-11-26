const chalk = require('chalk');
const { connection } = require('mongoose');
const { verifyer } = require('./jwt');
const UserHandler = require('./UserHandler');

// TODO - remove filthy hack
const cookieParse = c => {
  if (typeof c === 'string') {
    let res = c.split('x-access-token=');
    // console.log(res[1]);
    return res[1];
  }
};

const websocketListener = server => {
  const io = require('socket.io')(server);
  const handler = new UserHandler();

  io.on('connection', socket => {
    // console.log(socket);
    // TODO this is a HACK
    const token = verifyer(cookieParse(socket.handshake.headers.cookie));
    if (token && token.userId) {
      const result = handler.add(token.userId, socket);
      if (result) {
        socket.userId = result.userId;
        console.log(chalk.greenBright('Authneticated: ' + token.userId));
      } else {
        console.log(chalk.redBright('auth failed: ' + token.userId));
        socket.disconnect();
      }
    }

    console.log(
      chalk.blueBright('[socket.io]'),
      chalk.grey(socket.client.id),
      chalk.blue('connected'),
      chalk.grey(socket.handshake.headers['user-agent'])
    );

    socket.on('relay', payload => {
      const partnerId = handler.partnerId(socket.userId);
      console.log('relay from:' + socket.userId + ' -> ' + partnerId);
      console.log(chalk.grey(payload.type));
      io.to(partnerId).emit('relay', payload);
    });

    socket.on('ready', payload => {
      const peerSocketId = handler.partnerId(socket.userId) || null;
      console.log(chalk.bgRedBright('works'));
      if (peerSocketId) {
        console.log('partner matched');
        io.to(handler.partnerId(socket.userId)).emit('makeOffer', {
          msg: 'partner just connected',
        });
        socket.emit('awaitOffer', {
          msg: 'partner asked to send offer',
        });
      }
      console.log(
        chalk.red('[socket.io]'),
        chalk.grey(socket.client.id),
        chalk.blue('connected'),
        chalk.grey(socket.handshake.headers['user-agent'])
      );
    });

    socket.on('disconnect', reason => {
      handler.remove(socket.id);

      console.log(
        chalk.blueBright('[socket.io]'),
        chalk.grey(socket.id),
        chalk.blue('disconnected'),
        chalk.white(reason)
      );
    });
  });
};

module.exports = { websocketListener, UserHandler };
