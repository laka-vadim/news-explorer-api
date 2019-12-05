const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const signup = require('./middlewares/signup');
const signin = require('./middlewares/signin');
// const auth = require('./middlewares/auth');
const myErrors = require('./middlewares/errors');

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

app.use('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), signup);
app.use('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), signin);

// app.use(auth);

app.use(errors());

// Err From Controllers
app.use(myErrors);


// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # возвращает все сохранённые пользователем статьи
// GET /articles

// # создаёт статью с переданными в теле
// # keyword, title, text, date, source, link и image
// POST /articles

// # удаляет сохранённую статью  по _id
// DELETE /articles/articleId
