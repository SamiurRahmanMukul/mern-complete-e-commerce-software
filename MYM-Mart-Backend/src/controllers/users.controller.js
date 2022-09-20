const User = require('../models/users.model');
const formattedResponse = require('../config/formattedResponse');
const MyQueryHelper = require('../config/queryHelper');
const { loginResponse } = require('../config/appResponse');

// !controller for register new user
exports.register = async (req, res) => {
  try {
    const {
      userName, fullName, email, phone, password, address, gender, role
    } = req.body;

    if (userName && fullName && email && phone && password && address) {
      // check if userName, email or phone already exists
      const findUserName = await User.findOne({ userName });
      const findEmail = await User.findOne({ email });
      const findPhone = await User.findOne({ phone });

      if (findUserName) {
        return res.status(409).json(formattedResponse(
          9,
          'ALREADY EXIST',
          'Sorry, Username already exists'
        ));
      }

      if (findEmail) {
        return res.status(409).json(formattedResponse(
          9,
          'ALREADY EXIST',
          'Sorry, Email already exists'
        ));
      }

      if (findPhone) {
        return res.status(409).json(formattedResponse(
          9,
          'ALREADY EXIST',
          'Sorry, Phone number already exists'
        ));
      }

      // create new user and store in database
      const user = await User.create({
        userName,
        fullName,
        email,
        phone,
        password,
        avatar: req.file ? `/uploads/users/${req.file.filename}` : '/avatar.png',
        gender,
        address,
        role
      });

      // success response with register new user
      res.status(201).json(formattedResponse(
        0,
        'SUCCESS',
        'User registered successful',
        {
          userName: user.userName,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          avatar: process.env.APP_BASE_URL + user.avatar,
          gender: user.gender,
          address: user.address,
          role: user.role,
          status: user.status,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      ));
    } else {
      return res.status(400).json(formattedResponse(
        1,
        'FAILED',
        'Please enter all required fields'
      ));
    }
  } catch (err) {
    res.status(500).json(formattedResponse(
      2,
      'SERVER SIDE ERROR',
      'Something wen wrong! User registration failed',
      null,
      err
    ));
  }
};

// !controller for login existing user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { loginType } = req.query;

    // check if email or password is empty
    if (!email || !password) {
      return res.status(400).json(formattedResponse(
        1,
        'FAILED',
        'Please enter email and password'
      ));
    }

    // check user already exists
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(404).json(formattedResponse(
        4,
        'UNKNOWN ACCESS',
        'User does not exist'
      ));
    }

    // if query loginType is "admin"
    if (loginType === 'admin') {
      if (user.role !== 'admin') {
        return res.status(406).json(formattedResponse(
          6,
          'UNABLE TO ACCESS',
          'Accessing the page or resource you were trying to reach is forbidden'
        ));
      }
    }

    // check password matched
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json(formattedResponse(
        1,
        'FAILED',
        'User credentials are incorrect'
      ));
    }

    // update user status & updateAt time
    const logUser = await User.findByIdAndUpdate(
      user._id,
      { status: 'login', updatedAt: Date.now() },
      { new: true }
    );

    // response user with JWT access token token
    loginResponse(res, 201, 0, 'SUCCESS', 'User login successful', logUser);
  } catch (error) {
    res.status(500).json(formattedResponse(
      1,
      'FAILED',
      'Sorry! User login failed',
      null,
      error
    ));
  }
};

// !controller for logout user
exports.logoutUser = async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(404).json(formattedResponse(
        4,
        'UNKNOWN ACCESS',
        'Unauthorized access. Please login to continue'
      ));
    }

    // update user status & updateAt time
    await User.findByIdAndUpdate(
      user._id,
      { status: 'logout', updatedAt: Date.now() },
      { new: true }
    );

    // remove cookie
    res.clearCookie('AccessToken');

    // response user
    res.status(200).json(formattedResponse(
      0,
      'SUCCESS',
      'User logged out successful'
    ));
  } catch (error) {
    res.status(500).json(formattedResponse(
      2,
      'SERVER SIDE ERROR',
      'Sorry! User logout failed',
      null,
      error
    ));
  }
};

// !controller for get all users
exports.getAllUsers = async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(401).json(formattedResponse(
        1,
        'FAILED',
        'Unauthorized access. Please login to continue'
      ));
    }

    // check if user is admin
    if (user.role !== 'admin') {
      return res.status(406).json(formattedResponse(
        6,
        'UNABLE TO ACCESS',
        'Accessing the page or resource you were trying to reach is forbidden'
      ));
    }

    // get all users
    const users = await User.find({});

    // product filtering based on searching or sorting queries
    const userQuery = new MyQueryHelper(User.find(), req.query).search().paginate();
    const newUser = await userQuery.query;

    // response users
    res.status(200).json(formattedResponse(
      0,
      'SUCCESS',
      'Users fetched successful',
      {
        total_user: users.length,
        num_of_page: Math.ceil(users.length / req.query.limit),
        num_of_rows: newUser.length,
        rows: [
          ...newUser.map((mapUser) => ({
            id: mapUser._id,
            userName: mapUser.userName,
            fullName: mapUser.fullName,
            email: mapUser.email,
            phone: mapUser.phone,
            avatar: process.env.APP_BASE_URL + mapUser.avatar,
            role: mapUser.role,
            status: mapUser.status,
            createdAt: mapUser.createdAt,
            updatedAt: mapUser.updatedAt
          }))
        ]
      }
    ));
  } catch (error) {
    res.status(500).json(formattedResponse(
      2,
      'SEVER SIDER ERROR',
      'Sorry! Failed to get all users',
      null,
      error
    ));
  }
};

// make a controller for get user by id
exports.getUserById = async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(401).json(formattedResponse(
        1,
        'FAILED',
        'Unauthorized access. Please login to continue'
      ));
    }

    // get user by id
    const userId = req.params.id;
    const userById = await User.findById(userId);

    if (!userById) {
      return res.status(404).json(formattedResponse(
        4,
        'UNKNOWN ACCESS',
        'User was not found'
      ));
    }

    // response single by id user
    res.status(200).json(formattedResponse(
      0,
      'SUCCESS',
      'User fetched successful',
      {
        id: userById._id,
        userName: userById.userName,
        fullName: userById.fullName,
        email: userById.email,
        phone: userById.phone,
        avatar: process.env.APP_BASE_URL + userById.avatar,
        role: userById.role,
        status: userById.status,
        createdAt: userById.createdAt,
        updatedAt: userById.updatedAt
      }
    ));
  } catch (error) {
    res.status(500).json(formattedResponse(
      2,
      'SERVER SIDE ERROR',
      'Sorry! Failed to get a user',
      null,
      error
    ));
  }
};
