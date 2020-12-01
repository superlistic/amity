const Jogger = require('../Jogger');
const chalk = require('chalk');
const log = new Jogger(chalk.blue('[SessionHanlder]'));
const uuid = require('uuid');

class MeetingHandler {
  constructor() {
    this.users = {};
    this.meetings = [
      [
        'dc79214a-25f5-441c-a527-02a2ba38c4f4',
        '52edd659-8161-401b-905b-173dd48d0cc5',
      ],
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
    log.mute('create meeting between', users);
    this.meetings.push(users);
  }
  match(uid) {
    let meeting = this.meetings.find(s => s.includes(uid));
    if (!meeting) {
      return null;
    }
    if (meeting[0] === uid) {
      return meeting[1];
    }
    if (meeting[1] === uid) {
      return meeting[0];
    }
    throw Error('logic error or meeting malformed');
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
module.exports = MeetingHandler;
