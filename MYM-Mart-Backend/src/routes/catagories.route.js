const router = require('express').Router();
const {
  createCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory, getCategoriesAgainstProducts
} = require('../controllers/catagories.controller');
const { isAuthenticatedApiFetcher, isAuthenticatedUser, isAdmin } = require('../middleware/authentication');
const catagoriesImageUpload = require('../middleware/catagoriesImageUpload');

// route to create a new category
router.route('/categories/new').post(isAuthenticatedApiFetcher, isAuthenticatedUser, isAdmin, catagoriesImageUpload.single('image'), createCategory);

// route to get a category by id
router.route('/categories/:id').get(isAuthenticatedApiFetcher, getCategoryById);

// route to get all catagories list
router.route('/categories').get(isAuthenticatedApiFetcher, getAllCategories);

// routes to update or delete a category
router.route('/categories/:id').put(isAuthenticatedApiFetcher, isAuthenticatedUser, isAdmin, catagoriesImageUpload.single('image'), updateCategory);
router.route('/categories/:id').delete(isAuthenticatedApiFetcher, isAuthenticatedUser, isAdmin, deleteCategory);

// route to get all catagories against products
router.route('/categories/:name').get(isAuthenticatedApiFetcher, getCategoriesAgainstProducts);

module.exports = router;
