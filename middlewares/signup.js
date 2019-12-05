const validator = require('validator');
const bcrypt = require('bcryptjs');

const User = require('../models/users');
const BadRequestError = require('../errors/badRequestError');


module.exports = (req, res, next) => {
  const { email, password, name } = req.body;
  if (!validator.isEmail(email)) throw new BadRequestError('Err 400: Invalid email');
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then((user) => res.status(201).send(user))
        .catch(next);
    })
    .catch(next);
};
