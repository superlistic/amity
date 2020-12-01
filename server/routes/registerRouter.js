const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const Jogger = require('../Jogger');
const log = new Jogger(chalk.red('[registerRouter]'));

const errorHandler = (req, res, err) => {
  res.json({ ok: false, error: err });
  log.err(req.id + err.codeName, err);
};

const registerRouter = Users => {
  // POST
  const postNewUser = (req, res) => {
    log.info('adding new user');
    console.log(req.body);
    try {
      Users.findOne(
        { email: req.body.email },
        {
          _id: userId,
          email: 1,
        }
      );
    } catch (err) {
      log.err(err);
    }
  };
};

module.exports = registerRouter;
