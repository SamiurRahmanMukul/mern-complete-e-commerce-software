const router = require('express').Router();
const { isAuthenticatedUser, isAdmin } = require('../middleware/authentication');
const {
  createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct
} = require('../controllers/products.controller');

router.route('/products/new').post(isAuthenticatedUser, isAdmin, createProduct);
router.route('/products').get(getAllProducts);
router.route('/products/:id').get(getSingleProduct);
router.route('/products/:id').put(isAuthenticatedUser, isAdmin, updateProduct);
router.route('/products/:id').delete(isAuthenticatedUser, isAdmin, deleteProduct);

module.exports = router;
