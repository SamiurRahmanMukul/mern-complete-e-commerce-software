const multer = require("multer");
const router = require("express").Router();
const avatarUpload = require("../middleware/userAvatarUpload");
const { isAuthenticatedApiFetcher, isAuthenticatedUser, isAdmin } = require("../middleware/authentication");
const { jwtTokenGenerate, register, loginUser, logoutUser, getAllUsers, getUserById, jwtEncodedToken } = require("../controllers/users.controller");

const upload = multer();

// make a router for generate jwt token
router.route("/auth/token").post(jwtTokenGenerate);

// makes router for register new user & login
router.route("/auth/register").post(isAuthenticatedApiFetcher, avatarUpload.single("avatar"), register);
router.route("/auth/login").post(isAuthenticatedApiFetcher, upload.none(), loginUser);

// make a router for logout user
router.route("/auth/logout").post(isAuthenticatedApiFetcher, isAuthenticatedUser, logoutUser);

// make a router for user change, forgot password & verify account
// router.route("/auth/change-password").post();
// router.route("/auth/forgot-password").post();
// router.route("/auth/verify-account").post();

// make a router for get all & single user
router.route("/user/all").get(isAuthenticatedApiFetcher, isAuthenticatedUser, isAdmin, getAllUsers);
router.route("/user/:id").get(isAuthenticatedApiFetcher, isAuthenticatedUser, getUserById);

// make a router for update and delete user account
// router.route("/user/update-account").put();
// router.route("/user/delete-account").delete();

module.exports = router;
