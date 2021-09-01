const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const {
  AuthenticationError, ConflictError, NotFoundError, RequestError,
} = require('../errors/export-errors');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      throw new AuthenticationError(err.message);
    }).catch(next);
};
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};
module.exports.getRegisteredUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
};
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new RequestError('Невалидный id');
      }
    }).catch(next);
};
module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash })
        .then((user) => {
          res.send({ user });
        })
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            throw new ConflictError('Пользователь с таким email уже существует');
          }
        }).catch(next);
    });
};
module.exports.patchProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
      }
      if (!name || !about) {
        throw new RequestError('Есть незаполненное поле');
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new RequestError('Некорректные данные');
      }
      if (err.name === 'CastError') {
        throw new RequestError('Невалидный id');
      }
    }).catch(next);
};
module.exports.patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
      }
      if (!avatar) {
        throw new RequestError('Есть незаполненное поле');
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new RequestError('Некорректные данные');
      }
      if (err.name === 'CastError') {
        throw new RequestError('Невалидный id');
      }
      throw new RequestError(err.message);
    }).catch(next);
};
