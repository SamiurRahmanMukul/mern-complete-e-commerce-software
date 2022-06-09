const router = require("express").Router();
const getAllProductsController = require("../controllers/get_all_products.controller");

router.route("/all-products").get(getAllProductsController);

module.exports = router;
