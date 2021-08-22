const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
  .then(users => res.send({ data: users }))
  .catch(err => res.send({ message: err.message }));
}
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
  .then(user => res.send({ data: user }))
  .catch(err => res.send({ message: err.message }));
}
module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.send({ message: err.message }));
}
module.exports.patchProfile = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about, avatar }, { new: true })
  .then(user => res.send({ data: user }))
  .catch(err => res.send({ message: err.message }));
}
module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
  .then(user => res.send({ data: user }))
  .catch(err => res.send({ message: err.message }));
}