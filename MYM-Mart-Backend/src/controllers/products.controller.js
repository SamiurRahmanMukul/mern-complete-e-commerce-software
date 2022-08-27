const MyQueryOptions = require('../lib/queryOptions');
const Products = require('../models/products.model');
const Catagories = require('../models/catagories.model');

// make a controller to create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Products(req.body);

    // check if product name is already exists
    const productExists = await Products.findOne({ name: product.name });

    // check if product category is already exists
    const categoryExists = await Catagories.findOne({ name: { $regex: new RegExp(`^${req.body.category}$`), $options: 'i' } });

    if (productExists) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Product name already exists'
      });
    }

    if (!categoryExists) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Product category does not exists'
      });
    }

    await product.save();

    res.status(201).json({
      statusCode: 201,
      message: 'Product created successful',
      data: product
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Product creation failed',
      error: err
    });
  }
};

// make a controller to get all products
exports.getAllProducts = async (req, res) => {
  try {
    // total number of products
    const totalProducts = (await Products.find()).length;

    // product filtering based on searching or sorting queries
    const productQuery = new MyQueryOptions(Products.find(), req.query).search().limit();
    const products = await productQuery.query;

    if (totalProducts === 0) {
      res.status(404).json({
        statusCode: 404,
        message: 'Currently any products not found in database. Please insert your first products. Thanks'
      });
    } else if (products.length === 0) {
      res.status(404).json({
        statusCode: 404,
        message: 'Searching or Sorting queries based any products not found'
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: 'Products fetched successful',
        totalProducts,
        responseProducts: products.length,
        data: products
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Products fetching failed',
      error: err
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
        message: 'Product not found'
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: 'Product fetched successful',
        data: product
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Product fetching failed',
      error: err
    });
  }
};

// make a controller to update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!product) {
      res.status(404).json({
        statusCode: 404,
        message: 'Product not found'
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: 'Product updated successful',
        data: product
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Product updating failed',
      error: err
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
        message: 'Product not found'
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: 'Product deleted successful.'
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Product deletion failed',
      error: err
    });
  }
};
