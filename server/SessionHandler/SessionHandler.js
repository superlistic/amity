const Jogger = require('../Jogger');
const log = new Jogger('SessionHanlder');
const uuid = require('uuid');

class SessionHandler {
  constructor() {
    this.users = {};
    // TODO haredcoded connection be gone
    this.sessions = [
      ['test-user-id', 'test-user-id2'],
      ['test-0', 'test-1'],
      ['test-2', 'test-3'],
      ['test-4', 'test-5'],
    ];
  }
  addUser(userId, socket) {
    if (!userId || !socket) {
      throw Error('missing parameter');
    }
    if (this.users[userId]) {
      log.info2('updating', userId);
    } else {
      log.info3('adding', userId);
    }
    this.users[userId] = { userId, socket };
    return this.users[userId];
  }
  removeUserBySocket(socketId) {
    for (const key in this.users) {
      if (this.users[key].socket.id === socketId) {
        delete this.users[key];
        log.info4('removed', key);
      }
    }
  }

  create(listUsers) {
    log.debug('create');
    this.sessions.push(listUsers);
    return session;
  }

  partnerId(uid) {
    let conn = this.debugSessions.find(c => c.id1 === uid || c.id2 === uid);
    if (!conn) {
      return null;
    }
    if (conn && conn.id1 === uid) {
      return this.socketId(conn.id2);
    }
    if (conn && conn.id2 === uid) {
      return this.socketId(conn.id1);
    }
    throw Error('this should not happen');
  }

  socketId(uid) {
    if (this.users[uid]) {
      return this.users[uid].socket.id;
    } else {
      return null;
    }
  }
}
module.exports = SessionHandler;
