const Jogger = require('../Jogger');
const log = new Jogger('SessionHanlder');
const uuid = require('uuid');

class SessionHandler {
  constructor() {
    this.users = {};
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
      log.mute('updating', userId);
    } else {
      log.mute('adding', userId);
    }
    this.users[userId] = { userId, socket };
    return this.users[userId];
  }
  removeUserBySocket(socketId) {
    for (const key in this.users) {
      if (this.users[key].socket.id === socketId) {
        delete this.users[key];
        log.mute('removed', key);
      }
    }
  }
  create(users) {
    log.mute('create', users);
    this.sessions.push(users);
  }
  match(uid) {
    let session = this.sessions.find(s => s.includes(uid));
    if (!session) {
      return null;
    }
    if (session[0] === uid) {
      return session[1];
    }
    if (session[1] === uid) {
      return session[0];
    }
    throw Error('logic error or session malformed');
  }
  isOnline(uid) {
    if (this.users[uid]) {
      return this.users[uid];
    } else {
      false;
    }
  }
  remove(uid) {
    for (const id in this.Users) {
      if (this.Users[uid]) {
        delete this.Users[id];
        log.debug('user deleted', id);
      } else {
        log.err('no such user');
      }
    }
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
