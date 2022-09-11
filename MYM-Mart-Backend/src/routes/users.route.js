const router = require('express').Router();
const avatarUpload = require('../middleware/userAvatarUpload');
const loginLimiter = require('../middleware/loginLimiter');
const { isAuthenticatedUser, isAdmin } = require('../middleware/authentication');
const {
  register, loginUser, logoutUser, getAllUsers, getUserById
} = require('../controllers/users.controller');

// !route for register, login or logout user
router.route('/auth/register').post(avatarUpload.single('avatar'), register);
router.route('/auth/login').post(loginLimiter, avatarUpload.none(), loginUser);
router.route('/auth/logout').post(isAuthenticatedUser, logoutUser);

// !route for get all users or single user
router.route('/user/get-user-list').get(isAuthenticatedUser, isAdmin, getAllUsers);
router.route('/user/:id').get(isAuthenticatedUser, getUserById);

// !route for update or delete user
// router.route('/user/:id').put(isAuthenticatedUser, updateUserById);
// router.route('/user/:id').delete(isAuthenticatedUser, deleteUserById);

module.exports = router;
