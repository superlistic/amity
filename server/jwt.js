const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
const expiresIn = 10;

const signer = data => {
  console.log(data);
  return jwt.sign(data, secret, { expiresIn });
};

const verifyer = token => {
  if (!token) {
    console.log(chalk.redBright('[jwt verifier]  -no token- '));
    return false;
  }
  try {
    const tok = jwt.verify(token, secret);
    // define required fields here
    if (tok.userId && tok.iat && tok.exp) {
      console.log(chalk.greenBright('[jwt verifier] -OK- '), tok.userId);
      return tok;
    }
    console.log(chalk.redBright('[jwt verifier]  -malformed token- '));
  } catch (err) {
    console.log(chalk.redBright('[jwt verifier]', err.name));
  }
};

const jwtMiddle = (req, res, next) => {
  try {
    req.token = verifyer(req.cookies['x-access-token']);
  } catch (err) {
    console.log(chalk.redBright('[jwtMiddle]', err.name));
    req.tokenError = err.name;
  }
  next();
};
module.exports = { jwtMiddle, signer, verifyer };
