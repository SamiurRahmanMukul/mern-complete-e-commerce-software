const Products = require("../models/products.model");

// make a controller to create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Products(req.body);
    await product.save();

    res.status(201).json({
      statusCode: 201,
      message: "Product created successfully.",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Product creation failed.",
      error: err,
    });
  }
};

// make a controller to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();

    res.status(200).json({
      statusCode: 200,
      message: "Products fetched successfully.",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Products fetching failed.",
      error: err,
    });
  }
};
