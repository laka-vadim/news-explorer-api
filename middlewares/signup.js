const bcrypt = require('bcryptjs');

const User = require('../models/users');

module.exports = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then((user) => res.status(201).send({
          _id: user._id,
          email: user.email,
          name: user.name,
        }))
        .catch(next);
    })
    .catch(next);
};
