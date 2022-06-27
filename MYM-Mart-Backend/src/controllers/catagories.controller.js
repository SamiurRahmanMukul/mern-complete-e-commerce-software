const Categories = require("../models/catagories.model");
const Products = require("../models/products.model");

// make a controller for creating category
exports.createCategory = async (req, res) => {
  try {
    const category = new Categories(req.body);

    // check if category name is already exists
    const categoryExists = await Categories.findOne({ name: category.name });

    if (categoryExists) {
      return res.status(400).json({
        statusCode: 400,
        message: "Category name already exists.",
      });
    } else {
      await category.save();

      res.status(201).json({
        statusCode: 201,
        message: "Category created successfully.",
        data: category,
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Category creation failed.",
      error: err,
    });
  }
};

// make a controller for getting all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();

    if (categories.length === 0) {
      res.status(404).json({
        statusCode: 404,
        message: "Sorry, no categories found in database. Please inset your first catagories. Thanks",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: "Categories fetched successfully.",
        totalCategories: categories.length,
        data: categories,
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Categories fetching failed.",
      error: err,
    });
  }
};

// make a controller for updating category
exports.updateCategory = async (req, res) => {
  try {
    const category = await MyQueryOptions(Products.find(), req.query).categories();

    if (!category) {
      res.status(404).json({
        statusCode: 404,
        message: "Category not found.",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: "Category updated successfully.",
        data: category,
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Category updating failed.",
      error: err,
    });
  }
};

// make a controller for deleting category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Categories.findByIdAndDelete(req.params.id);

    if (!category) {
      res.status(404).json({
        statusCode: 404,
        message: "Category against any products not found.",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: "Category deleted successfully.",
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Category deletion failed.",
      error: err,
    });
  }
};

// make a controller for categories against filter products
exports.getCategoriesAgainstProducts = async (req, res) => {
  try {
    // check if category name is exists
    let category = await Categories.findOne({ name: { $regex: new RegExp(`^${req.params.name}$`), $options: "i" } });

    if (!category) {
      res.status(404).json({
        statusCode: 404,
        message: "Category not found.",
      });
    } else {
      // get all products against category
      const products = await Products.find({
        category: { $regex: new RegExp(`^${req.params.name}$`), $options: "i" },
      });

      if (products.length === 0) {
        res.status(404).json({
          statusCode: 404,
          message: "No products found.",
        });
      } else {
        res.status(200).json({
          statusCode: 200,
          message: "Products fetched successfully.",
          totalProducts: products.length,
          data: products,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Categories fetching failed.",
      error: err,
    });
  }
};
