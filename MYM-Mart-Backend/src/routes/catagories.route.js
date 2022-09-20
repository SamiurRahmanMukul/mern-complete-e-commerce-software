const router = require('express').Router();
const {
  createCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory, getCategoriesAgainstProducts
} = require('../controllers/catagories.controller');
const { isAuthenticatedUser, isAdmin } = require('../middleware/authentication');
const catagoriesImageUpload = require('../middleware/catagoriesImageUpload');

// route to create a new category
router.route('/categories/new').post(isAuthenticatedUser, isAdmin, catagoriesImageUpload.single('image'), createCategory);

// route to get a category by id
router.route('/categories/:id').get(getCategoryById);

// route to get all catagories list
router.route('/categories').get(getAllCategories);

// routes to update or delete a category
router.route('/categories/:id').put(isAuthenticatedUser, isAdmin, catagoriesImageUpload.single('image'), updateCategory);
router.route('/categories/:id').delete(isAuthenticatedUser, isAdmin, deleteCategory);

// route to get all catagories against products
router.route('/categories/:name').get(getCategoriesAgainstProducts);

module.exports = router;
