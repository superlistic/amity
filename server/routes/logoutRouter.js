const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const Jogger = require('../Jogger');
const log = new Jogger(chalk.magenta('[logoutRouter]'));

const logoutRouter = (meetings, io) => {
  const logout = (req, res) => {
    log.debug('logging out user.', req.token.userId);
    res.clearCookie('x-access-token');
    res.redirect(302, '/');

    const socketId = meetings.socketId(req.token.userId);
    meetings.remove(socketId);
    const peerId = meetings.match(req.token.userId);
    io.to(meetings.socketId(peerId)).emit('friendDisconnected', {
      msg: '[socket] partner disconnected',
    });

    log.info('disconnected', socketId), log.mute(reason);
  };

  router.get('/', logout);
  return router;
};
module.exports = { logoutRouter };
