const { verifyer } = require('./jwt');
const { SessionHandler, Session, Client } = require('./SessionHandler');
const Jogger = require('./Jogger');
const log = new Jogger('socket');

// TODO - make better
const cookieParse = c => {
  if (typeof c === 'string') {
    let res = c.split('x-access-token=');
    return res[1];
  }
};

const websocketListener = server => {
  const io = require('socket.io')(server);
  const sessionHandler = new SessionHandler();
  const debugSession = sessionHandler.create(['test-user-id', 'test-user-id2']);

  io.on('connection', socket => {
    const token = verifyer(cookieParse(socket.handshake.headers.cookie));
    if (!token) {
      log.warn('unverified connection rejected', socket.id);
      socket.disconnect();
      return;
    }
    log.info3('connect', socket.client.id);
    log.mute(socket.handshake.headers['user-agent']);
    const result = sessionHandler.addClient(new Client(token.userId, socket));

    if (result) {
      socket.userId = result.userId;
    }

    // check if partner online
    const peerSocketId = sessionHandler.match(socket.userId) || null;
    if (peerSocketId) {
      io.to(sessionHandler.partnerId(socket.userId)).emit('matchUpdate', {
        msg: '[socket] partner just connected',
      });
      socket.emit('matchUpdate', {
        msg: '[socket] partner is online',
      });
    }

    socket.on('relay', payload => {
      const partnerId = sessionHandler.partnerId(socket.userId);
      log.mute(
        `relaying ${payload.type} ` + socket.userId + ' -> ' + partnerId
      );
      io.to(partnerId).emit('relay', payload);
    });

    socket.on('ready', payload => {
      const peerSocketId = sessionHandler.partnerId(socket.userId) || null;
      log.info2('"ready" recieved');
      if (peerSocketId) {
        log.info3('partner matched');
        io.to(sessionHandler.partnerId(socket.userId)).emit('makeOffer', {
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
      sessionHandler.remove(socket.id);
      io.to(sessionHandler.partnerId(socket.userId)).emit('matchUpdate', {
        msg: '[socket] partner disconnected',
      });

      log.info4('disconnected', socket.id), log.info(reason);
    });
  });
};

module.exports = { websocketListener, UserHandler: SessionHandler };
