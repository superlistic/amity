const chalk = require('chalk');

class UserHandler {
  constructor() {
    this.users = {};
    // TODO haredcoded connection be gone
    this.connections = [
      { id1: 'test-user-id', id2: 'test-user-id2' },
      { id1: 'test-0', id2: 'test-1' },
      { id1: 'test-2', id2: 'test-3' },
      { id1: 'test-4', id2: 'test-5' },
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
module.exports = UserHandler;
