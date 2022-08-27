const router = require('express').Router();
const { isAuthenticatedApiFetcher, isAuthenticatedUser, isAdmin } = require('../middleware/authentication');
const {
  createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct
} = require('../controllers/products.controller');

router.route('/products/new').post(isAuthenticatedApiFetcher, isAuthenticatedUser, isAdmin, createProduct);
router.route('/products').get(isAuthenticatedApiFetcher, getAllProducts);
router.route('/products/:id').get(isAuthenticatedApiFetcher, getSingleProduct);
router.route('/products/:id').put(isAuthenticatedApiFetcher, isAuthenticatedUser, isAdmin, updateProduct);
router.route('/products/:id').delete(isAuthenticatedApiFetcher, isAuthenticatedUser, isAdmin, deleteProduct);

module.exports = router;
