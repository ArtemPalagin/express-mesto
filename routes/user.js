const router = require('express').Router();
const {
  getUsers, getUser, postUser, patchProfile, patchAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', postUser);
router.patch('/users/me', patchProfile);
router.patch('/users/me/avatar', patchAvatar);

module.exports = router;
