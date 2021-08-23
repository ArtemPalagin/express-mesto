const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
  .then(cards => res.send({ data: cards }))
  .catch(err => res.send({ message: err.message }));
}
module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
  .then(card => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные' });
    }
    res.status(500).send({ message: err.message })
  });
}
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if(!card) {
      res.status(404).send({ message: 'Такой карточки не существует' });
    }
    res.send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    }
    res.status(500).send({ message: err.message })
  });
}
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,{ $addToSet: { likes: req.user._id } }, { new: true })
  .then((card) => {
    if(!card) {
      res.status(404).send({ message: 'Такой карточки не существует' });
    }
    res.send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    }
    res.status(500).send({ message: err.message })
  });
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,{ $pull: { likes: req.user._id } },{ new: true })
  .then((card) => {
    if(!card) {
      res.status(404).send({ message: 'Такой карточки не существует' });
    }
    res.send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    }
    res.status(500).send({ message: err.message })
  });
}
