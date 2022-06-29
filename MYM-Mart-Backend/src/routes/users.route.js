const router = require("express").Router();
const { register, loginUser, logoutUser } = require("../controllers/users.controller");
const { isAuthenticatedApiFetcher } = require("../middleware/authentication");

router.route("/auth/register").post(isAuthenticatedApiFetcher, register);
router.route("/auth/login").post(isAuthenticatedApiFetcher, loginUser);
router.route("/auth/logout").post(isAuthenticatedApiFetcher, logoutUser);
// router.route("/auth/update-account").put();
// router.route("/auth/delete-account").delete();
// router.route("/auth/change-password").post();
// router.route("/auth/forgot-password").post();
// router.route("/auth/verify-account").post();

module.exports = router;
