const router = require("express").Router();
const { register } = require("../controllers/users.controller");

router.route("/auth/register").post(register);
// router.route("/auth/login").post();
// router.route("/auth/logout").post();
// router.route("/auth/update-account").put();
// router.route("/auth/delete-account").delete();
// router.route("/auth/change-password").post();
// router.route("/auth/forgot-password").post();
// router.route("/auth/verify-account").post();

module.exports = router;
