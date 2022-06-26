const Categories = require("../models/catagories.model");

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
    res.status(200).json({
      statusCode: 200,
      message: "Categories fetched successfully.",
      totalCategories: categories.length,
      data: categories,
    });
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
    const category = await Categories.findByIdAndUpdate(req.params.id, req.body, { new: true });

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
        message: "Category not found.",
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
