const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const errorHandler = (req, res, err) => {
  res.json({ ...err, ok: false }),
    console.log(
      chalk.red(req.id),
      chalk.redBright(err.codeName),
      chalk.grey(err)
    );
};

const connectSocket = (req, res) => {};

// ROUTES
router.get('/', connectSocket);

module.exports = { router };
