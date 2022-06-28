const router = require("express").Router();
const { createCategory, getAllCategories, updateCategory, deleteCategory, getCategoriesAgainstProducts } = require("../controllers/catagories.controller");
const { isAuthenticatedUser } = require("../middleware/authentication");

router.route("/categories/new").post(isAuthenticatedUser, createCategory);
router.route("/categories").get(getAllCategories);
router.route("/categories/:id").put(isAuthenticatedUser, updateCategory);
router.route("/categories/:id").delete(isAuthenticatedUser, deleteCategory);
router.route("/categories/:name").get(getCategoriesAgainstProducts);

module.exports = router;
