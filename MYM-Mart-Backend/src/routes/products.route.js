const router = require("express").Router();
const { createProduct, getAllProducts } = require("../controllers/products.controller");

router.route("/products/new").post(createProduct);
router.route("/products").get(getAllProducts);

module.exports = router;
