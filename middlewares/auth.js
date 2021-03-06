const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  if (!token) {
    throw new UnauthorizedError('Err 401: Authorization required');
  }
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError('Err 401: Authorization required');
  }
  req.user = payload;
  next();
};
