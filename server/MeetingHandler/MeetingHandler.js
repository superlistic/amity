const Jogger = require('../Jogger');
const chalk = require('chalk');
const log = new Jogger(chalk.blue('[MeetingsHanlder]'));
const uuid = require('uuid');

// TODO: remove meeting mechanism
class MeetingHandler {
  constructor() {
    this.instaQue = null;
    this.instaMeetings = [];
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
  create(meeting) {
    if (!meeting.time || !meeting.users) {
      log.err('Malformed meeting');
      throw Error('MalformedMeetingError');
    }
    const duplicate = this.meetings.find(m => {
      if (
        m.users.includes(meeting.users[0]) &&
        m.users.includes(meeting.users[1]) &&
        m.time === meeting.time
      ) {
        return m;
      }
    });
    if (!duplicate) {
      const m = { ...meeting, id: uuid.v4() };
      log.warn('creating meeting');
      this.meetings.push(m);
      return m;
    } else {
      log.warn('asked to add Duplicate. returning original');
      return duplicate;
    }
  }
  createInsta(meeting) {
    log.debug('creating instaMeeting');
    console.log(meeting);
    if (!meeting.users.length === 2) {
      throw Error('invalid meeting');
    }
    this.instaMeetings.push(meeting);
  }

  instantMeeting(uid) {
    log.info('instantMeeting for', uid);
    if (this.instaQue && this.instaQue !== uid) {
      const uid2 = this.instaQue;
      log.info('with', uid2);
      this.instaQue = null;
      this.createInsta({ users: [uid, uid2] });
      return uid2;
    } else {
      this.instaQue = uid;
    }
  }
  match(uid) {
    let meeting = this.meetings.find(m => m.users.includes(uid));
    if (!meeting) {
      meeting = this.instaMeetings.find(m => m.users.includes(uid));
      if (!meeting) {
        return null;
      }
    }
    if (meeting.users[0] === uid) {
      return meeting.users[1];
    }
    if (meeting.users[1] === uid) {
      return meeting.users[0];
    }
    throw Error('logic error or meeting malformed');
  }
  matchAll(uid) {
    const meetings = this.meetings.filter(m => {
      return m.users.includes(uid);
    });
    if (!meetings) {
      return null;
    }
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
        log.err('no such user', id);
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
