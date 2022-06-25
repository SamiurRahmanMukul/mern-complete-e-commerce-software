const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "Product ID is required and must be a number."],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Product name is required field."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required field."],
  },
  price: {
    type: Number,
    required: [true, "Product price is required field."],
    maxLength: [10, "Product price must be less than 10 characters."],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url_1: {
        type: String,
        required: true,
      },
      url_2: {
        type: String,
      },
      url_3: {
        type: String,
      },
      youtube_url: {
        type: String,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Product category is required field."],
  },
  sub_category: {
    type: String,
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required field."],
    maxLength: [4, "Product stock must be less than 4 characters."],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user_id: {
        type: Number,
        required: true,
      },
      user_name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Products", productsSchema);
