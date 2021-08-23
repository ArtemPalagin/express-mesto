const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
  .then((cards) => {
    return res.send({ data: cards })
  })
  .catch((err) => {
    return res.send({ message: err.message })
  });
}
module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
  .then((card) => {
    return res.send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Некорректные данные' });
    }
    return res.status(500).send({ message: err.message })
  });
}
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if(!card) {
      return res.status(404).send({ message: 'Такой карточки не существует' });
    }
    return res.send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Невалидный id ' });
    }
    return res.status(500).send({ message: err.message })
  });
}
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,{ $addToSet: { likes: req.user._id } }, { new: true })
  .then((card) => {
    if(!card) {
      return res.status(404).send({ message: 'Такой карточки не существует' });
    }
    return res.send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Невалидный id ' });
    }
    return res.status(500).send({ message: err.message })
  });
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,{ $pull: { likes: req.user._id } },{ new: true })
  .then((card) => {
    if(!card) {
      return res.status(404).send({ message: 'Такой карточки не существует' });
    }
    return res.send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Невалидный id ' });
    }
    return res.status(500).send({ message: err.message })
  });
}
