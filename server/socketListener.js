const { verifyer } = require('./jwt');
const { MeetingHandler } = require('./MeetingHandler');
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
  const meetings = new MeetingHandler();
  // meetings.create([
  //   'dc79214a-25f5-441c-a527-02a2ba38c4f4',
  //   '52edd659-8161-401b-905b-173dd48d0cc5',
  // ]);
  // TODO: instantConnection
  io.on('connection', socket => {
    const token = verifyer(cookieParse(socket.handshake.headers.cookie));
    if (!token) {
      log.warn('rejected socket id', socket.id);
      socket.disconnect();
      return;
    }
    const result = meetings.addUser(token.userId, socket);
    socket.userId = result.userId;
    log.debug();
    console.log(meetings);

    log.ok('connect socket', socket.id);
    log.mute(socket.handshake.headers['user-agent']);

    // check if partner online
    let peerId = meetings.match(socket.userId) || null;
    if (!peerId) {
      peerId = meetings.instantMeeting(socket.userId);
    }
    if (meetings.isOnline(peerId)) {
      io.to(meetings.socketId(peerId)).emit('matchUpdate', {
        msg: '[socket] partner just connected',
      });
      socket.emit('matchUpdate', {
        msg: '[socket] partner is online',
      });
    }

    socket.on('relay', payload => {
      const peerId = meetings.match(socket.userId);
      log.mute(`relaying ${payload.type} ` + socket.userId + ' -> ' + peerId);
      io.to(meetings.socketId(peerId)).emit('relay', payload);
    });

    socket.on('ready', () => {
      const match = meetings.match(socket.userId) || null;
      log.mute('"ready" recieved from', socket.userId);
      if (match) {
        log.mute('meeting exists');
        io.to(meetings.socketId(match)).emit('makeOffer', {
          msg: '[socket] partner just connected',
        });
        socket.emit('awaitOffer', {
          msg: '[socket] partner asked to send offer',
        });
      } else {
        log.warn('no meeting found for', socket.userId);
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

module.exports = { websocketListener, UserHandler: MeetingHandler };
