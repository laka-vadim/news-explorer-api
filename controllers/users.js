const User = require('../models/users');
const NotFoundError = require('../errors/notFoundError');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Err 404: Articles not found');
      res.send(user);
    })
    .catch(next);
};

module.exports = getUser;
