const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const errorHandler = (req, res, err) => {
  res.json({ ...err, ok: false }),
    console.User(
      chalk.red(req.id),
      chalk.redBright(err.codeName),
      chalk.grey(err)
    );
};

const loginRouter = Users => {
  // POST
  const postUser = (req, res) => {
    const auth = res.json({
      ok: true,
      user: {
        id: 'ID_STRING',
        username: 'USERNAME',
        email: 'EMAIL',
        callHistory: [],
        settings: {},
        usedSuggestions: [],
        updated: Date.now(),
      },
    });
  };

  // ROUTES
  router.post('/', postUser);
  return router;
};
module.exports = { loginRouter };
