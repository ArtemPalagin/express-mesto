const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
  .then(users => res.send({ data: users }))
  .catch(err => res.status(500).send({ message: err.message }));
}
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
  .then((user) => {
    if(!user){
      res.status(404).send({ message: "Такого пользователя не существует" })
    }
    res.send({ data: user })
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    }
    res.status(500).send({ message: err.message })
  });
}
module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
      }
      res.status(500).send({ message: err.message })
    });
}
module.exports.patchProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
  .then((user) => {
    if(!user){
      res.status(404).send({ message: "Такого пользователя не существует" })
    }
    res.send({ data: user })
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные' });
    }
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    }
    res.status(500).send({ message: err.message })
  });
}
module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
  .then((user) => {
    if(!user){
      res.status(404).send({ message: "Такого пользователя не существует" })
    }
    res.send({ data: user })
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Некорректные данные' });
    }
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    }
    res.status(500).send({ message: err.message })
  });
}