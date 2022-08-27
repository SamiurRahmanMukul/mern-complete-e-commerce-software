const fs = require('fs');
const Categories = require('../models/catagories.model');
const Products = require('../models/products.model');
const MyQueryOptions = require('../lib/queryOptions');

// make a controller for creating new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file;

    if (!name && !image) {
      res.status(400).json({
        statusCode: 400,
        message: 'Category name and image is required field'
      });
    } else {
      const newName = name.replace(/\s/g, '').toLowerCase();

      // check if category name is exists
      const findCategory = await Categories.findOne({ name: newName });

      if (findCategory) {
        res.status(400).json({
          statusCode: 400,
          message: 'Category name already exists'
        });
      } else {
        // create new category
        const category = await Categories.create({
          name: newName,
          image: `/uploads/catagories/${image.filename}`,
          createdBy: req.user._id
        });

        res.status(201).json({
          statusCode: 201,
          message: 'Category created successful',
          data: {
            id: category._id,
            name: category.name,
            image: process.env.APP_BASE_URL + category.image,
            createdBy: category.createdBy
          }
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Category creation failed',
      error: err
    });
  }
};

// make a controller for getting category by id
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        statusCode: 400,
        message: 'Category id is required field'
      });
    } else {
      // get category by id
      const category = await Categories.findById(id);

      if (!category) {
        res.status(404).json({
          statusCode: 404,
          message: 'Category not found'
        });
      } else {
        res.status(200).json({
          statusCode: 200,
          message: 'Category found successful',
          data: {
            id: category._id,
            name: category.name,
            image: process.env.APP_BASE_URL + category.image,
            createdBy: category.createdBy
          }
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Category fetching failed',
      error: err
    });
  }
};

// make a controller for getting all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();

    // product filtering based on searching or sorting queries
    const categoryQuery = new MyQueryOptions(Categories.find(), req.query).search().paginate();
    const categoryNew = await categoryQuery.query;

    if (!categories) {
      res.status(404).json({
        statusCode: 404,
        message: 'No categories found'
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: 'Categories fetched successful',
        totalCategories: categories.length,
        numOfPages: Math.ceil(categories.length / req.query.limit),
        numOfItems: categoryNew.length,
        data: [
          ...categoryNew.map((category) => ({
            id: category._id,
            name: category.name,
            image: process.env.APP_BASE_URL + category.image,
            createdBy: category.createdBy
          }))
        ]
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Categories fetching failed',
      error: err
    });
  }
};

// make a controller for updating category
exports.updateCategory = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    const { name } = req.body;
    const image = req.file;

    if (!category) {
      res.status(404).json({
        statusCode: 404,
        message: 'Category not found'
      });
    } else {
      const newName = name.replace(/\s/g, '').toLowerCase();

      if (name && image) {
        // delete old category image
        fs.unlink(`${__dirname}/../../public${category.image}`, (err) => {
          if (err) {
            res.status(500).json({
              statusCode: 500,
              message: 'Category old image deletion failed',
              error: err
            });
          }
        });

        // update category
        const updatedCategory = await Categories.findByIdAndUpdate(
          req.params.id,
          {
            name: newName,
            image: `/uploads/catagories/${image.filename}`,
            createdBy: req.user._id
          },
          { new: true }
        );

        res.status(200).json({
          statusCode: 200,
          message: 'Category updated successful',
          data: updatedCategory
        });
      } else if (name) {
        // update category
        const updatedCategory = await Categories.findByIdAndUpdate(
          req.params.id,
          {
            name: newName
          },
          { new: true }
        );

        res.status(200).json({
          statusCode: 200,
          message: 'Category updated successful',
          data: {
            id: updatedCategory._id,
            name: updatedCategory.name,
            image: process.env.APP_BASE_URL + updatedCategory.image
          }
        });
      } else {
        res.status(400).json({
          statusCode: 400,
          message: 'Category name and image is required field'
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Category updating failed',
      error: err
    });
  }
};

// make a controller for deleting category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);

    if (!category) {
      res.status(404).json({
        statusCode: 404,
        message: 'Category not found'
      });
    } else {
      // delete category
      await Categories.findByIdAndDelete(req.params.id);

      // delete category image
      fs.unlink(`${__dirname}/../../public${category.image}`, (err) => {
        if (err) {
          res.status(500).json({
            statusCode: 500,
            message: 'Category image deletion failed',
            error: err
          });
        }
      });

      res.status(200).json({
        statusCode: 200,
        message: 'Category deleted successful'
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Category deletion failed',
      error: err
    });
  }
};

// make a controller for categories against filter products
exports.getCategoriesAgainstProducts = async (req, res) => {
  try {
    // check if category name is exists
    const category = await Categories.findOne({ name: { $regex: new RegExp(`^${req.params.name}$`), $options: 'i' } });

    if (!category) {
      res.status(404).json({
        statusCode: 404,
        message: 'Category not found'
      });
    } else {
      // get all products against category
      const products = await Products.find({
        category: { $regex: new RegExp(`^${req.params.name}$`), $options: 'i' }
      });

      if (products.length === 0) {
        res.status(404).json({
          statusCode: 404,
          message: 'No products found'
        });
      } else {
        res.status(200).json({
          statusCode: 200,
          message: 'Products fetched successful',
          totalProducts: products.length,
          data: products
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: 'Categories products fetching failed',
      error: err
    });
  }
};
