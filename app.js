const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const signup = require('./middlewares/signup');
const signin = require('./middlewares/signin');
const auth = require('./middlewares/auth');
const myErrors = require('./middlewares/errors');
const pageNotFound = require('./middlewares/pageNotFound');
const users = require('./routes/users');
const articles = require('./routes/articles');

const { PORT = 3000 } = process.env;
const app = express();

app.listen(PORT);

mongoose.connect('mongodb://localhost:27017/newsAPI', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), signup);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), signin);

app.use(auth);

app.use('/articles', articles);
app.use('/users', users);
app.use(pageNotFound);

app.use(errors());

// My Custom Errors
app.use(myErrors);
