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
    // VERIFY x-access-token
    const token = verifyer(cookieParse(socket.handshake.headers.cookie));
    if (token && token.userId) {
      const result = handler.add(token.userId, socket);
      if (result) {
        socket.userId = result.userId;
      } else {
        socket.disconnect();
      }
    }
    // check if partner online
    const peerSocketId = handler.partnerId(socket.userId) || null;
    if (peerSocketId) {
      io.to(handler.partnerId(socket.userId)).emit('matchUpdate', {
        msg: '[socket] partner just connected',
      });
      socket.emit('matchUpdate', {
        msg: '[socket] partner is online',
      });
    }

    console.log(
      chalk.blueBright('[sockets]'),
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
      console.log(chalk.bgGreen(chalk.black('"ready" recieved')));
      if (peerSocketId) {
        console.log('partner matched');
        io.to(handler.partnerId(socket.userId)).emit('makeOffer', {
          msg: '[socket] partner just connected',
        });
        socket.emit('awaitOffer', {
          msg: '[socket] partner asked to send offer',
        });
      } else {
        console.log('ELSE', peerSocketId);
      }
      console.log(
        chalk.red('[sockets]'),
        chalk.grey(socket.client.id),
        chalk.blue('connected'),
        chalk.grey(socket.handshake.headers['user-agent'])
      );
    });

    socket.on('disconnect', reason => {
      handler.remove(socket.id);
      io.to(handler.partnerId(socket.userId)).emit('matchUpdate', {
        msg: '[socket] partner disconnected',
      });

      console.log(
        chalk.blueBright('[sockets]'),
        chalk.grey(socket.id),
        chalk.blue('disconnected'),
        chalk.white(reason)
      );
    });
  });
};

module.exports = { websocketListener, UserHandler };
