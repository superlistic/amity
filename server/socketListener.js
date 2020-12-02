const { verifyer } = require('./jwt');
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

const websocketListener = (server, meetings, users) => {
  log.ok('listening');
  const io = require('socket.io')(server);
  io.on('connection', socket => {
    const token = verifyer(cookieParse(socket.handshake.headers.cookie));
    if (!token) {
      log.warn('rejected socket id', socket.id);
      socket.disconnect();
      return;
    }
    const result = meetings.addUser(token.userId, socket);
    socket.userId = result.userId;
    log.ok('connect socket', socket.id);
    log.mute(socket.handshake.headers['user-agent']);
    // check if partner online
    const peerId = meetings.match(socket.userId) || null;
    if (peerId) {
      if (meetings.isOnline(peerId)) {
        const prom1 = users.findOne(
          { userId: socket.userId },
          {
            _id: 0,
            userId: 1,
            username: 1,
            email: 1,
            bio: 1,
            tagline: 1,
            avatar: 1,
            updated: 1,
          }
        );
        const prom2 = users.findOne(
          { userId: peerId },
          {
            _id: 0,
            userId: 1,
            username: 1,
            email: 1,
            bio: 1,
            tagline: 1,
            avatar: 1,
            updated: 1,
          }
        );
        Promise.all([prom1, prom2]).then(([peer1, peer2]) => {
          log.info2('matchUpdate. sending peer info to', peerId);
          io.to(meetings.socketId(peerId)).emit('matchUpdate', {
            msg: 'peer just connected',
            peer: peer1,
          });
          log.info2('matchUpdate. sending peer info to', socket.userId);
          socket.emit('matchUpdate', {
            msg: 'peer is already online',
            peer: peer2,
          });
        });
      }
    }

    socket.on('instantConnection', () => {
      log.info3('instant request from', socket.userId);
      const match = meetings.instantMeeting(socket.userId) || null;
      log.info3('match is', match);
      if (match) {
        log.info3('instant meeting availible');
        log.info3('on instant: makeOffer to', match);
        io.to(meetings.socketId(match)).emit('makeOffer', {
          msg: '[socket] partner just connected',
        });
        log.info3('on instant: awaitOffer to', socket.userId);
        socket.emit('awaitOffer', {
          msg: '[socket] partner asked to send offer',
        });
      } else {
        log.info3('no instant meeting found for', socket.userId);
      }
    });

    socket.on('relay', payload => {
      const peerId = meetings.match(socket.userId);
      log.mute(`relaying ${payload.type} ` + socket.userId + ' -> ' + peerId);
      io.to(meetings.socketId(peerId)).emit('relay', payload);
    });

    socket.on('ready', () => {
      const match = meetings.match(socket.userId) || null;
      log.info('"ready" recieved from', socket.userId);
      if (match) {
        log.info('meeting exists');
        log.info('onReady: makeOffer to', match);
        io.to(meetings.socketId(match)).emit('makeOffer', {
          msg: '[socket] partner just connected',
        });
        log.info('onReady: awaitOffer to', match);
        socket.emit('awaitOffer', {
          msg: '[socket] partner asked to send offer',
        });
      } else {
        log.info('no meeting found for', socket.userId);
      }
    });

    socket.on('disconnect', reason => {
      meetings.remove(socket.id);
      io.to(meetings.match(socket.userId)).emit('matchUpdate', {
        msg: '[socket] partner disconnected',
      });

      log.info('disconnected', socket.id), log.mute(reason);
    });
  });
};

module.exports = { websocketListener };
