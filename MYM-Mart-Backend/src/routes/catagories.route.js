const router = require("express").Router();
const { createCategory, getAllCategories, updateCategory, deleteCategory } = require("../controllers/catagories.controller");

router.route("/categories/new").post(createCategory);
router.route("/categories").get(getAllCategories);
router.route("/categories/:id").put(updateCategory);
router.route("/categories/:id").delete(deleteCategory);

module.exports = router;
