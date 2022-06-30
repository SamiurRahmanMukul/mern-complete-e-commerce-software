const User = require("../models/users.model");
const jwtToken = require("../lib/jwtToken");
const jwt = require("jsonwebtoken");

// make a controller for register new user
exports.register = async (req, res) => {
  try {
    const { userName, fullName, email, phone, password, gender } = req.body;

    // check if userName, email or phone already exists
    const findUserName = await User.findOne({ userName });
    const findEmail = await User.findOne({ email });
    const findPhone = await User.findOne({ phone });

    if (findUserName) {
      return res.status(400).json({
        statusCode: 400,
        message: "User name already exists.",
      });
    } else if (findEmail) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email already exists.",
      });
    } else if (findPhone) {
      return res.status(400).json({
        statusCode: 400,
        message: "Phone number already exists.",
      });
    } else {
      const name = userName.replace(/\s/g, "").toLowerCase();

      const user = await User.create({
        userName: name,
        fullName,
        email,
        phone,
        password,
        avatar: req.file ? "/uploads/users/" + req.file.filename : "/avatar.png",
        gender,
      });

      // update user status & updateAt time
      const updatedUser = await User.findByIdAndUpdate(user._id, { status: "login", updatedAt: Date.now() }, { new: true });

      // response user with JWT token
      jwtToken(updatedUser, 201, "User registered successfully.", res);
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "User registration failed.",
      error: error,
    });
  }
};

// make a controller for login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { loginType } = req.query;

    if (!email || !password) {
      // check if email or password is empty
      return res.status(400).json({
        statusCode: 400,
        message: "Please enter email and password.",
      });
    }

    // check user if exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        message: "User not found.",
      });
    }

    // if query loginType is "admin"
    if (loginType === "admin") {
      // check if user is admin
      if (user.role !== "admin") {
        return res.status(400).json({
          statusCode: 400,
          message: "Only authorized user access here.",
        });
      }
    }

    // check password matched
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        statusCode: 400,
        message: "Password does not match.",
      });
    }

    // update user status & updateAt time
    const updatedUser = await User.findByIdAndUpdate(user._id, { status: "login", updatedAt: Date.now() }, { new: true });

    // response user with JWT token
    jwtToken(updatedUser, 200, "User logged in successfully.", res);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "User login failed.",
      error: error,
    });
  }
};

// make a controller for logout user
exports.logoutUser = async (req, res) => {
  try {
    // get token form cookie
    const { AccessToken } = req.cookies;
    if (AccessToken) {
      // verify token
      const decoded = jwt.verify(AccessToken, process.env.JWT_SECRET_KEY);

      // check if user exists
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          statusCode: 401,
          message: "Unauthorized access. Please login to continue.",
        });
      } else {
        // update user status & updateAt time
        await User.findByIdAndUpdate(user._id, { status: "logout", updatedAt: Date.now() }, { new: true });

        // remove cookie
        res.clearCookie("AccessToken");

        // response user
        res.status(200).json({
          statusCode: 200,
          message: "User logged out successfully.",
        });
      }
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Please login first. Then logout.",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "User logout failed.",
      error: error,
    });
  }
};

// make a controller for get all users
exports.getAllUsers = async (req, res) => {
  try {
    // get token form cookie
    const { AccessToken } = req.cookies;
    if (AccessToken) {
      // verify token
      const decoded = jwt.verify(AccessToken, process.env.JWT_SECRET_KEY);

      // check if user exists
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          statusCode: 401,
          message: "Unauthorized access. Please login to continue.",
        });
      } else {
        // check if user is admin
        if (user.role !== "admin") {
          return res.status(400).json({
            statusCode: 400,
            message: "Only authorized user not access here.",
          });
        } else {
          // get all users
          const users = await User.find({});

          // response users
          res.status(200).json({
            statusCode: 200,
            message: "Users fetched successfully.",
            totalUsers: users.length,
            data: users,
          });
        }
      }
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Please login first. Then get all users.",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Failed to get all users.",
      error: error,
    });
  }
};

// make a controller for get user by id
exports.getUserById = async (req, res) => {
  try {
    // get token form cookie
    const { AccessToken } = req.cookies;

    if (AccessToken) {
      // verify token
      const decoded = jwt.verify(AccessToken, process.env.JWT_SECRET_KEY);

      // check if user exists
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          statusCode: 401,
          message: "User not found.",
        });
      } else {
        // get user by id
        const userById = await User.findById(req.params.id);

        // response user
        res.status(200).json({
          statusCode: 200,
          message: "User fetched successfully.",
          data: userById,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Failed to get a user.",
      error: error,
    });
  }
};
