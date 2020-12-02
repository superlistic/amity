const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const Jogger = require('../Jogger');
const log = new Jogger(chalk.magenta('[logoutRouter]'));

const logoutRouter = () => {
  const logout = (req, res) => {
    log.debug('logging out user.', req.token.userId);
    res.clearCookie('x-access-token');
  };

  router.get('/', logout);
  return router;
};
module.exports = { logoutRouter };
