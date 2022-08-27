const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, 'User name is required.']
  },
  fullName: {
    type: String,
    required: [true, 'Full name filed is required.']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email filed is required.'],
    validate: [validator.isEmail, 'Please enter a valid email address.']
  },
  phone: {
    type: String,
    unique: true,
    validate: [validator.isMobilePhone, 'Please enter a valid phone number.']
  },
  password: {
    type: String,
    required: [true, 'Password filed is required.'],
    minlength: [6, 'Password must be at least 6 characters.'],
    select: false
  },
  avatar: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  address: {
    type: String,
    required: [true, 'Address field is required.']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  verified: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['register', 'login', 'logout'],
    default: 'register'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// after save, hash password
usersSchema.pre('save', async (next) => {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 8);
});

// JWT Token
usersSchema.methods.getJWTToken = () => jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
  expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES
});

// compare password
usersSchema.methods.comparePassword = async (password) => bcrypt.compare(password, this.password);

module.exports = mongoose.model('Users', usersSchema);
