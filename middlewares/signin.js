const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/users');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError('Err 401: Incorrect login or/and email.');
      bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) throw new UnauthorizedError('Err 401: Incorrect login or/and email.');
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          return res
            .cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
            }).end();
        })
        .catch(next);
    })
    .catch(next);
};
