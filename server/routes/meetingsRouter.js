const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const Jogger = require('../Jogger');
const log = new Jogger(chalk.red('[meetingsRouter]'));

const errorHandler = (req, res, err) => {
  res.json({ ok: false, error: err });
  log.err(req.id + err.codeName, err);
};

const meetingsRouter = meetings => {
  // GET
  const myMeetings = (req, res) => {
    if (req.token.userId) {
      const m = meetings.matchAll(req.token.userId);
      res.json({ meetings: m });
    } else {
      res.status(401);
      errorHandler(req, res, Error('not authorized. '));
    }
  };
  // POST
  const newMeeting = (req, res) => {
    if (req.token.userId && req.body.time) {
      const m = meetings.createBlind(req.body.time, req.token.userId);
      res.json(m);
    } else {
      res.status(401);
      errorHandler(req, res, Error('not authorized.'));
    }
  };
  // const newMeeting = (req, res) => {
  //   if (req.token.userId) {
  //     const m = { time: req.body.time, users: req.body.users };
  //     const newM = meetings.create(m);
  //     res.json(newM);
  //   } else {
  //     res.status(401);
  //     errorHandler(req, res, Error('not authorized.'));
  //   }
  // };
  // DELETE
  const removeMeeting = (req, res) => {
    if (req.body && req.body.meetingId) {
      log.debug(req.body.meetingId);
    } else {
      errorHandler(req, res, Error('invalid body, meeting id required'));
    }
  };
  router.get('/', myMeetings);
  router.post('/', newMeeting);
  router.delete('/', removeMeeting);
  return router;
};

module.exports = { meetingsRouter };
