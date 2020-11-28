const { verifyer } = require('./jwt');
const { SessionHandler } = require('./SessionHandler');
const Jogger = require('./Jogger');
const chalk = require('chalk');
const log = new Jogger(chalk.cyan('[socket]'));

// TODO - make better
const cookieParse = c => {
  if (typeof c === 'string') {
    let res = c.split('x-access-token=');
    return res[1];
  }
};

const websocketListener = server => {
  const io = require('socket.io')(server);
  const handler = new SessionHandler();
  handler.create(['test-user-id', 'test-user-id2']);
  handler.create(['test-0', 'test-1']);
  handler.create(['test-2', 'test-3']);
  handler.create(['test-4', 'test-5']);

  io.on('connection', socket => {
    const token = verifyer(cookieParse(socket.handshake.headers.cookie));
    if (!token) {
      log.warn('rejected', socket.id);
      socket.disconnect();
      return;
    }
    log.ok('connect', socket.client.id);
    log.mute(socket.handshake.headers['user-agent']);
    const result = handler.addUser(token.userId, socket);

    if (result) {
      socket.userId = result.userId;
    }

    // check if partner online
    const peerId = handler.match(socket.userId) || null;

    if (handler.isOnline(peerId)) {
      io.to(handler.socketId(peerId)).emit('matchUpdate', {
        msg: '[socket] partner just connected',
      });
      socket.emit('matchUpdate', {
        msg: '[socket] partner is online',
      });
    }

    socket.on('relay', payload => {
      const peerId = handler.match(socket.userId);
      log.mute(`relaying ${payload.type} ` + socket.userId + ' -> ' + peerId);
      io.to(handler.socketId(peerId)).emit('relay', payload);
    });

    socket.on('ready', () => {
      const match = handler.match(socket.userId) || null;
      log.ok('"ready" recieved');
      if (match) {
        log.ok('partner matched');
        io.to(handler.socketId(match)).emit('makeOffer', {
          msg: '[socket] partner just connected',
        });
        socket.emit('awaitOffer', {
          msg: '[socket] partner asked to send offer',
        });
      } else {
        log.warn('no peer found for', socket.userId);
      }
    });

    socket.on('disconnect', reason => {
      handler.remove(socket.id);
      io.to(handler.match(socket.userId)).emit('matchUpdate', {
        msg: '[socket] partner disconnected',
      });

      log.info('disconnected', socket.id), log.mute(reason);
    });
  });
};

module.exports = { websocketListener, UserHandler: SessionHandler };
