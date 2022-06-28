const router = require("express").Router();
const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } = require("../controllers/products.controller");
const { isAuthenticatedUser } = require("../middleware/authentication");

router.route("/products/new").post(isAuthenticatedUser, createProduct);
router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getSingleProduct);
router.route("/products/:id").put(isAuthenticatedUser, updateProduct);
router.route("/products/:id").delete(isAuthenticatedUser, deleteProduct);

module.exports = router;
