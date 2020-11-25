const chalk = require('chalk');
const user = require('./database/schemas/user');
const { verifyer } = require('./jwt');

class UserHandler {
  constructor() {
    this.users = [];
    // TODO haredcoded connection be gone
    this.connections = [{ id1: 'test-user-id', id2: 'test-user-id2' }];
    console.log(chalk.magenta('[UserHandler]'), ' created');
  }
  add(userID, socket) {
    if (this.users.some(user => user.userID === userID)) {
      return { userID, socketID: user.socketID };
    }
    this.users.push({ userID, socketID: socket.id });
    console.log(chalk.magenta('[UserHandler]'), userID, 'added');
    console.log(this.users);
    return { userID, socketID: socket.id };
  }
  remove(socketID) {
    this.users = this.users.filter(user => {
      if (user.socketID !== socketID) {
        return { msg: user.userID + 'removed' };
      }
      return false;
    });
    console.log(chalk.magenta('[UserHandler]'), socketID, 'removed');
  }
  partnerID(userId) {
    const connection = this.connections.find(c => {
      if (c.id1 === userId || c.id2 === userId) {
        return true;
      } else false;
    });
    if (connection && connection.id1 === userId) {
      return this.socId(connection.id2);
    } else if (connection && connection.id2 === userId) {
      return this.socId(connection.id1);
    } else return null;
  }
  socId(uid) {
    const user = this.users.find(u => {
      if (u.userID === uid) return u;
    });
    try {
      return user.socketID;
    } catch (error) {
      console.log(chalk.red('socId: no such user'));
      return null;
    }
  }
  numUsers() {
    return this.users.length;
  }
  listUsers() {
    return users;
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
    console.log(chalk.bgGreen(chalk.black(handler.numUsers())));
    // TODO this is a HACK
    const token = verifyer(cookieParse(socket.handshake.headers.cookie));
    if (token && token.userID) {
      const result = handler.add(token.userID, socket);
      if (result) {
        socket.user = result.userID;
        console.log(chalk.greenBright('Authneticated : ' + token.userID));
      } else {
        console.log(chalk.yellowBright('auth failed: ' + token.userID));
        socket.disconnect();
      }
    }
    const partnerID = handler.partnerID(socket.user);
    if (partnerID) {
      console.log('partner match');
      io.to(partnerID).emit('partnerMatch', {
        usersOnline: handler.numUsers,
      });
    }
    io.to(handler.socId(socket.user)).emit(
      'relay',
      handler.partnerID(socket.user)
    );
    console.log(
      chalk.blueBright('[socket.io]'),
      chalk.grey(socket.client.id),
      chalk.blue('connected'),
      chalk.grey(socket.handshake.headers['user-agent'])
    );

    socket.on('relay', payload => {
      console.log('relay from:' + socket.user + ' -> ' + partnerID);
      console.log(payload);
      io.to(handler.partnerID(socket.user)).emit(
        'relay',
        handler.partnerID(socket.user)
      );
    });

    socket.on('disconnect', reason => {
      handler.remove(socket.client.id);

      console.log(
        chalk.blueBright('[socket.io]'),
        chalk.grey(socket.client.id),
        chalk.blue('disconnected'),
        chalk.white(reason)
      );
    });
  });
  return new UserHandler(io);
};

module.exports = { websocketListener, UserHandler };
