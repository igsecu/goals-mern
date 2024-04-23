const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/index");

// Register User
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  // Validations

  if (validateName(name)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validateName(name),
    });
  }

  if (validatePassword(password)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validatePassword(password),
    });
  }

  if (validateEmail(email)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validateEmail(email),
    });
  }

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
    console.log(error.message);
    return next("Error trying to register new user");
  }
};

// Authenticate User
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Validations -> check if email and password are missing
  if (!email) {
    return res.status(400).json({
      statusCode: 400,
      msg: "Email is missing",
    });
  }

  if (!password) {
    return res.status(400).json({
      statusCode: 400,
      msg: "Password is missing",
    });
  }

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
    bcrypt.compare(password, user.password, async (err, isMatch) => {
      if (err) {
        return next("Error during the login process!");
      }
      if (!isMatch) {
        return res.status(400).json({
          statusCode: 400,
          msg: "Incorrect password!",
        });
      } else {
        return res.status(200).json({
          statusCode: 200,
          msg: "Login successfully!",
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          token: generateToken(user._id),
        });
      }
    });
  } catch (error) {
    return next("Error trying to authenticate a user");
  }
};

// Get user data
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      statusCode: 200,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return next("Error trying to get user data");
  }
};

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
