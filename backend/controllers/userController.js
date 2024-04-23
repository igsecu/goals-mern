const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

// Register User
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  // Validations
  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        statusCode: 400,
        msg: `Email ${email} exists! Try with another one...`,
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      return res.status(201).json({
        statusCode: 201,
        msg: "User created successfully!",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    return next("Error trying to register new user");
  }
};

// Authenticate User
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Validations -> check if email and password are missing

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        msg: "Email does not exist!",
      });
    }

    // Check password
    if (password !== (await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        statusCode: 400,
        msg: "Incorrect password!",
      });
    }

    res.status(200).json({
      statusCode: 200,
      msg: "Login successfully!",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    return next("Error trying to authenticate a user");
  }
};

// Get user data
const getUser = (req, res, next) => {};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
