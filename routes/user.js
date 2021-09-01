const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getRegisteredUser, getUser, patchProfile, patchAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/me', getRegisteredUser);
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchProfile);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri({
      scheme: [
        'http', 'https',
      ],
    }),
  }),
}), patchAvatar);

module.exports = router;
