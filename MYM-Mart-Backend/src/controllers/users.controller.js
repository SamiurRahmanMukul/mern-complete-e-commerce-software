const User = require("../models/users.model");
const jwtToken = require("../lib/jwtToken");

// make a controller for register new user
exports.register = async (req, res) => {
  try {
    const { userName, fullName, email, phone, password } = req.body;

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
      const user = await User.create({
        userName,
        fullName,
        email,
        phone,
        password,
        avatar: {
          url: "https://toppng.com//public/uploads/preview/avatar-png-11554021661asazhxmdnu.png",
        },
      });

      // response user with JWT token
      jwtToken(user, 201, "User registered successfully.", res);
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
