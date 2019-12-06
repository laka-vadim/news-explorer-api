const Articles = require('../models/articles');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const getArticles = (req, res, next) => {
  Articles.find({ owner: req.user._id })
    .then((articles) => {
      if (!articles) throw new NotFoundError('Err 404: Articles not found');
      res.send(articles);
    })
    .catch(next);
};

const postArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  Articles.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      res.status(201).send(article);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Articles.findById(req.params.articleId).populate('owner')
    .then((article) => {
      if (!article) throw new NotFoundError('Err 404: Articles not found');
      if (req.user._id !== article.owner._id.toString()) throw new ForbiddenError('Err 403: You havent permission for this');
      Articles.findByIdAndRemove(req.body.articleId)
        .then((delArticle) => res.send(delArticle))
        .catch(next);
    })
    .catch(next);
};

module.exports = { getArticles, postArticle, deleteArticle };
