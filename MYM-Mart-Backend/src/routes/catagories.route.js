const router = require("express").Router();
const { createCategory, getAllCategories, updateCategory, deleteCategory, getCategoriesAgainstProducts } = require("../controllers/catagories.controller");

router.route("/categories/new").post(createCategory);
router.route("/categories").get(getAllCategories);
router.route("/categories/:id").put(updateCategory);
router.route("/categories/:id").delete(deleteCategory);
router.route("/categories/:name").get(getCategoriesAgainstProducts);

module.exports = router;
