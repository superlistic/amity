const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const Jogger = require('../Jogger');
const log = new Jogger(chalk.red('[meetingsRouter]'));
const uuid = require('uuid');
const user = require('../database/schemas/user');

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
    if (req.token.userId) {
      const m = { time: req.body.time, users: req.body.users };
      const newM = meetings.create(m);
      res.json(newM);
    } else {
      res.status(401);
      errorHandler(req, res, Error('not authorized.'));
    }
  };
  router.get('/', myMeetings);
  router.post('/', newMeeting);
  return router;
};

module.exports = { meetingsRouter };
