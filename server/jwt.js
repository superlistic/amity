const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const jwtMiddle = (req, res, next) => {
  try {
    req.token = jwt.verify(req.cookies['x-access-token'], secret);
    // if (req.token.iat) {
    //   // TODO: check time on jwt
    // }
    // console.log(req.token);
  } catch (err) {
    console.log(err.name, err.message);
  }
  next();
};
const signer = data => {
  console.log(data);
  return jwt.sign(data, secret);
};

const verifyer = token => {
  try {
    const tok = jwt.verify(token, secret);
    console.log('-----------------------');
    console.log(tok);
    console.log(chalk.greenBright('[jwt verify] -OK- '), tok.userId);
    return tok;
  } catch (error) {
    console.log(chalk.redBright('[jwt verify]  -FAIL- '));
    // return error;
  }
};
module.exports = { jwtMiddle, signer, verifyer };
