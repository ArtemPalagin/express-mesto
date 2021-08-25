const router = require('express').Router();
const {
  getUsers, getUser, patchProfile, patchAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.patch('/users/me', patchProfile);
router.patch('/users/me/avatar', patchAvatar);

module.exports = router;
