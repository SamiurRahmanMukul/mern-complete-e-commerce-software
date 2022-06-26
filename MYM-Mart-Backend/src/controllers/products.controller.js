const MyQueryOptions = require("../lib/queryOptions");
const Products = require("../models/products.model");

// make a controller to create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Products(req.body);

    // check if product name is already exists
    const productExists = await Products.findOne({ name: product.name });

    if (productExists) {
      return res.status(400).json({
        statusCode: 400,
        message: "Product name already exists.",
      });
    } else {
      await product.save();

      res.status(201).json({
        statusCode: 201,
        message: "Product created successfully.",
        data: product,
      });
    }
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
    const productQuery = new MyQueryOptions(Products.find(), req.query).search();
    const products = await productQuery.query;

    if (products.length === 0) {
      res.status(404).json({
        statusCode: 404,
        message: "Products not found.",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: "Products fetched successfully.",
        totalProducts: products.length,
        data: products,
      });
    }
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

    if (!product) {
      res.status(404).json({
        statusCode: 404,
        message: "Product not found.",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: "Product fetched successfully.",
        data: product,
      });
    }
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

    if (!product) {
      res.status(404).json({
        statusCode: 404,
        message: "Product not found.",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: "Product updated successfully.",
        data: product,
      });
    }
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
    const product = await Products.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404).json({
        statusCode: 404,
        message: "Product not found.",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: "Product deleted successfully.",
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Product deletion failed.",
      error: err,
    });
  }
};
