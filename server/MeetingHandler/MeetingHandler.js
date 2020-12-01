const Jogger = require('../Jogger');
const chalk = require('chalk');
const log = new Jogger(chalk.blue('[SessionHanlder]'));

class MeetingHandler {
  constructor() {
    this.instaQue = null;
    this.users = {};
    this.meetings = [];
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
  // TODO guard against "different order of users but otherwise the same"-meetings
  create(users) {
    log.mute('create meeting between', users);
    this.meetings.includes(users);
    this.meetings.push(users);
  }
  instantMeeting(uid) {
    if (this.instaQue && this.instaQue !== uid) {
      const uid2 = this.instaQue;
      this.create([uid, uid2]);
      this.instaQue = null;
      return this.match(uid);
    } else {
      this.instaQue = uid;
    }
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
  matchAll(uid) {
    log.debug('new - matchAll');
    let meetings = this.meetings.findAll(s => s.includes(uid));
    if (!meetings) {
      return null;
    }
    console.log(meetings);
    return meetings;
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
