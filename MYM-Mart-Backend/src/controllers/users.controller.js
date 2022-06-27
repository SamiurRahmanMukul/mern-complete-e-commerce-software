const User = require("../models/users.model");

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

      res.status(201).json({
        statusCode: 201,
        message: "User registered successfully.",
        "X-JWT-TOKEN": user.getJWTToken(),
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "User registration failed.",
      error: error,
    });
  }
};
