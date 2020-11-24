const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const jwtMiddle = (req, res, next) => {
  try {
    req.token = jwt.verify(req.cookies.token, secret);
    if (req.token.iat) {
      // TODO: check time on jwt
      // console.log(req.token);
    }
  } catch (err) {
    console.log(err.name, err.message);
  }
  next();
};
const signer = data => {
  return jwt.sign(data, secret);
};
module.exports = { jwtMiddle, signer };
