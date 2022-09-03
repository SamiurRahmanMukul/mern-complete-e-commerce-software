const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required field.'],
    trim: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Product price is required field.'],
    maxLength: [10, 'Product price must be less than 10 characters.']
  },
  images: [
    {
      url: {
        type: String,
        required: true
      }
    }
  ],
  youtube_url: {
    type: String
  },
  category: {
    type: String,
    required: [true, 'Product category is required field.']
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required field.'],
    maxLength: [4, 'Product stock must be less than 4 characters.']
  },
  rating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      user_id: {
        type: Number,
        required: true
      },
      user_name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Product created by is required field.']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Products', productsSchema);
