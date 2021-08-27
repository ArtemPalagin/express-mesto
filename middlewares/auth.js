const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
} = require('../errors/export-errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthenticationError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new AuthenticationError('Необходима авторизация'));
  }

  req.user = payload;

  next();
  return null;
};
