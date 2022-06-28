const router = require("express").Router();
const { createCategory, getAllCategories, updateCategory, deleteCategory, getCategoriesAgainstProducts } = require("../controllers/catagories.controller");
const { isAuthenticatedUser, isAdmin } = require("../middleware/authentication");

router.route("/categories/new").post(isAuthenticatedUser, isAdmin, createCategory);
router.route("/categories").get(getAllCategories);
router.route("/categories/:id").put(isAuthenticatedUser, isAdmin, updateCategory);
router.route("/categories/:id").delete(isAuthenticatedUser, isAdmin, deleteCategory);
router.route("/categories/:name").get(getCategoriesAgainstProducts);

module.exports = router;
