const Card = require('../models/card');
const {
  ForbiddenError, NotFoundError, RequestError,
} = require('../errors/export-errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      throw err;
    })
    .catch(next);
};
module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new RequestError('Некорректные данные');
      }
      throw err;
    }).catch(next);
};
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      if (`${req.user._id}` !== `${card.owner}`) {
        throw new ForbiddenError('Чужую карточку удалять нельзя');
      }

      return Card.findByIdAndRemove(req.params.cardId)
        .then((removedCard) => res.send(removedCard))
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new RequestError('Невалидный id');
      }
    }).catch(next);
};
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new RequestError('Невалидный id');
      }
      throw err;
    }).catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new RequestError('Невалидный id ');
      }
      throw err;
    }).catch(next);
};
