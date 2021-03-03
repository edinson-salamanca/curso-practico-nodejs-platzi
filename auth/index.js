const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, 'secreto');
}
function verify(toke) {
  return jwt.verify(toke, secret);
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);
  },
};

function getToken(auth) {
  if (!auth) {
    throw new Error('No viene token');
  }
  if (auth.indexOf('Bearer') === -1) {
    throw new Error('Formato invalido');
  }

  let token = auth.replace('Bearer', '');

  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;
}

module.exports = {
  sign,
};
