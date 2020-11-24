const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const { signer } = require('../jwt');

const errorHandler = (req, res, err) => {
  res.json({ ok: false, error: err });
  console.log(
    chalk.red(req.id),
    chalk.redBright(err.codeName),
    chalk.grey(err)
  );
};

const loginRouter = Users => {
  // POST
  const postUser = (req, res) => {
    Users.findOne(
      { email: req.body.email, passwordHash: req.body.hash },
      {
        _id: 0,
        userID: 1,
        username: 1,
        email: 1,
        bio: 1,
        tagline: 1,
        avatar: 1,
        callHistory: 1,
        settings: 1,
        usedSuggestions: 1,
        updated: 1,
      }
    )
      .then(user => {
        if (user) {
          res.cookie(
            'token',
            signer({ userID: user.userID }, { httpOnly: true })
          );
          res.json({
            ok: true,
            user,
          });
        } else {
          res.status(401);
          res.json({ ok: false, message: 'No such user' });
          console.log(chalk.grey(req.id), chal.bgRed('login failed'));
        }
      })
      .catch(err => {
        errorHandler(req, res, err);
      });
  };

  // ROUTES
  router.post('/', postUser);
  return router;
};
module.exports = { loginRouter };
