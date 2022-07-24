const User = require("../models/users.model");
const jwtToken = require("../lib/jwtToken");
const jwt = require("jsonwebtoken");

// make a controller for jsonwebtoken encoded token generated for user
exports.jwtTokenGenerate = (req, res) => {
  try {
    const { url, jwtSecret } = req.body;

    if (url && jwtSecret) {
      // generate token
      const token = jwt.sign({ url }, jwtSecret);

      // response token
      res.status(200).json({
        statusCode: 200,
        message: "Token generated successfully",
        jwtToken: token,
      });
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Please enter required fields",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Failed to generate JWT token",
      error: error,
    });
  }
};

// make a controller for register new user
exports.register = async (req, res) => {
  try {
    const { userName, fullName, email, phone, password, address, gender } = req.body;

    if (userName && fullName && email && phone && password && address) {
      // check if userName, email or phone already exists
      const findUserName = await User.findOne({ userName });
      const findEmail = await User.findOne({ email });
      const findPhone = await User.findOne({ phone });

      if (findUserName) {
        return res.status(400).json({
          statusCode: 400,
          message: "User name already exists",
        });
      } else if (findEmail) {
        return res.status(400).json({
          statusCode: 400,
          message: "Email already exists",
        });
      } else if (findPhone) {
        return res.status(400).json({
          statusCode: 400,
          message: "Phone number already exists",
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
          address,
        });

        // response user with JWT token
        res.status(201).json({
          statusCode: 201,
          message: "User registered successfully",
          user: {
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
            updatedAt: user.updatedAt,
          },
        });
      }
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: "Please enter all required fields",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "User registration failed",
      error: error,
    });
  }
};

// make a controller for login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { loginType } = req.query;

    if (!email && !password) {
      // check if email or password is empty
      return res.status(400).json({
        statusCode: 400,
        message: "Please enter email and password",
      });
    }

    // check user if exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        message: "User does not exist",
      });
    }

    // if query loginType is "admin"
    if (loginType === "admin") {
      // check if user is admin
      if (user.role !== "admin") {
        return res.status(400).json({
          statusCode: 400,
          message: "Only authorized user access here",
        });
      }
    }

    // check password matched
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        statusCode: 400,
        message: "User credentials are incorrect",
      });
    }

    // update user status & updateAt time
    const updatedUser = await User.findByIdAndUpdate(user._id, { status: "login", updatedAt: Date.now() }, { new: true });

    // response user with JWT token
    jwtToken(updatedUser, 200, "User logged in successfully", res);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "User login failed",
      error: error,
    });
  }
};

// make a controller for logout user
exports.logoutUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized access. Please login to continue",
      });
    } else {
      // update user status & updateAt time
      await User.findByIdAndUpdate(user._id, { status: "logout", updatedAt: Date.now() }, { new: true });

      // remove cookie
      res.clearCookie("AccessToken");

      // response user
      res.status(200).json({
        statusCode: 200,
        message: "User logged out successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "User logout failed",
      error: error,
    });
  }
};

// make a controller for get all users
exports.getAllUsers = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized access. Please login to continue",
      });
    } else {
      // check if user is admin
      if (user.role !== "admin") {
        return res.status(400).json({
          statusCode: 400,
          message: "Only authorized user access here",
        });
      } else {
        // get all users
        const users = await User.find({});

        // response users
        res.status(200).json({
          statusCode: 200,
          message: "Users fetched successfully",
          totalUsers: users.length,
          data: [
            ...users.map((mapUser) => {
              return {
                id: mapUser._id,
                userName: mapUser.userName,
                fullName: mapUser.fullName,
                email: mapUser.email,
                phone: mapUser.phone,
                avatar: process.env.APP_BASE_URL + mapUser.avatar,
                role: mapUser.role,
                status: mapUser.status,
                createdAt: mapUser.createdAt,
                updatedAt: mapUser.updatedAt,
              };
            }),
          ],
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Failed to get all users",
      error: error,
    });
  }
};

// make a controller for get user by id
exports.getUserById = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized access. Please login to continue",
      });
    } else {
      // get user by id
      const userId = req.params.id;
      const userById = await User.findById(userId);

      if (!userById) {
        return res.status(400).json({
          statusCode: 400,
          message: "User was not found",
        });
      } else {
        // response user
        res.status(200).json({
          statusCode: 200,
          message: "User fetched successfully",
          data: {
            id: userById._id,
            userName: userById.userName,
            fullName: userById.fullName,
            email: userById.email,
            phone: userById.phone,
            avatar: process.env.APP_BASE_URL + userById.avatar,
            role: userById.role,
            status: userById.status,
            createdAt: userById.createdAt,
            updatedAt: userById.updatedAt,
          },
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Failed to get a user",
      error: error,
    });
  }
};
