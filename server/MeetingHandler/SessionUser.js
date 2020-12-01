class SessionUser {
  constructor(uid, socket = null) {
    this.userId = uid;
    this.socket = socket;
  }
}

module.exports = SessionUser;
