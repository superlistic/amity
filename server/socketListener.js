const chalk = require('chalk');
const { connection } = require('mongoose');
const { verifyer } = require('./jwt');

class UserHandler {
  constructor() {
    this.users = {};
    // TODO haredcoded connection be gone
    this.connections = [
      { id1: 'test-user-id', id2: 'test-user-id2' },
      { id1: 'test-0', id2: 'test-1' },
    ];
    console.log(
      chalk.yellowBright('[UserHandler]'),
      chalk.yellow('is created')
    );
  }
  add(userId, socket) {
    if (this.users[userId]) {
      console.log(
        chalk.yellowBright('[UserHandler]'),
        userId,
        chalk.yellow('updated')
      );
    } else {
      console.log(
        chalk.yellowBright('[UserHandler]'),
        userId,
        chalk.yellow('added')
      );
    }
    this.users[userId] = { userId, socket };
    return this.users[userId];
  }
  remove(socketId) {
    for (const key in this.users) {
      if (this.users[key].socket.id === socketId) {
        delete this.users[key];
        console.log(
          chalk.yellowBright('[UserHandler]'),
          key,
          chalk.yellow('removed')
        );
      }
    }
  }
  partnerId(uid) {
    let conn = this.connections.find(c => c.id1 === uid || c.id2 === uid);
    if (!conn) {
      console.log('no partner found');
      return null;
    }
    if (conn && conn.id1 === uid) {
      return this.socketId(conn.id2);
    }
    if (conn && conn.id2 === uid) {
      return this.socketId(conn.id1);
    }
    throw new Error('this should not happen');
  }

  socketId(uid) {
    if (this.users[uid]) {
      return this.users[uid].socket.id;
    } else {
      return null;
    }
  }
}

// Filthy hack
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
    const peerSocketId = handler.partnerId(socket.userId) || null;
    if (peerSocketId) {
      console.log('partner matched');
      io.to(handler.partnerId(socket.userId)).emit('partnerMatch', {
        msg: 'partner is connected',
      });
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
      console.log(payload);
      io.to(partnerId).emit('relay', payload);
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
