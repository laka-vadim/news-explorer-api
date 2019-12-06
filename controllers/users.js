const User = require('../models/users');

const getUser = (req, res, next) => {
  User.findById(req.body._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = getUser;
