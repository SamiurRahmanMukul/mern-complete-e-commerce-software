const router = require("express").Router();
const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } = require("../controllers/products.controller");

router.route("/products/new").post(createProduct);
router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getSingleProduct);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProduct);

module.exports = router;
