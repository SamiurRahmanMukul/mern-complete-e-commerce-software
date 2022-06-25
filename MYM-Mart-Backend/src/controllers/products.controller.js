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
      numOfProducts: products.length,
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

// make a controller to get a product
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    res.status(200).json({
      statusCode: 200,
      message: "Product fetched successfully.",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Product fetching failed.",
      error: err,
    });
  }
};

// make a controller to update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      statusCode: 200,
      message: "Product updated successfully.",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Product updating failed.",
      error: err,
    });
  }
};

// make a controller to delete a product
exports.deleteProduct = async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);

    res.status(200).json({
      statusCode: 200,
      message: "Product deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Product deletion failed.",
      error: err,
    });
  }
};
