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
  // TEST MEETING
  // meetings.create({
  //   time: Date.now(),
  //   users: [
  //     '52edd659-8161-401b-905b-173dd48d0cc5',
  //     'dc79214a-25f5-441c-a527-02a2ba38c4f4',
  //   ],
  // });
  // GET
  const getNewMeeting = (req, res) => {
    if (req.token.userId) {
      const m = meetings.matchAll(req.token.userId);
      res.json({ meetings: m });
    } else {
      res.status(401);
      errorHandler(req, res, Error('not authorized. '));
    }
  };
  router.get('/', getNewMeeting);
  return router;
};

module.exports = { meetingsRouter };
