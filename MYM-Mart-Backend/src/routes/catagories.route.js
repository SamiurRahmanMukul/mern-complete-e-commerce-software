const router = require("express").Router();
const { createCategory, getAllCategories, updateCategory, deleteCategory, getCategoriesAgainstProducts } = require("../controllers/catagories.controller");
const { isAuthenticatedApiFetcher, isAuthenticatedUser, isAdmin } = require("../middleware/authentication");

router.route("/categories/new").post(isAuthenticatedApiFetcher, isAuthenticatedUser, isAdmin, createCategory);
router.route("/categories").get(isAuthenticatedApiFetcher, getAllCategories);
router.route("/categories/:id").put(isAuthenticatedApiFetcher, isAuthenticatedUser, isAdmin, updateCategory);
router.route("/categories/:id").delete(isAuthenticatedApiFetcher, isAuthenticatedUser, isAdmin, deleteCategory);
router.route("/categories/:name").get(isAuthenticatedApiFetcher, getCategoriesAgainstProducts);

module.exports = router;
