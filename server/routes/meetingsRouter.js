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
