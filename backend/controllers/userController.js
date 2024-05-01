const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fsExtra = require("fs-extra");

require("dotenv").config();

const {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  validateImageSize,
  validateFileType,
} = require("../utils/index");

const { uploadUserImage, deleteImage } = require("../utils/cloudinary");

// Register User
const registerUser = async (req, res, next) => {
  const { name, email, password, password2 } = req.body;
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

  if (validatePasswordConfirmation(password, password2)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validatePasswordConfirmation(password, password2),
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

// Update user image
const updateUserImage = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (req.files?.image) {
      if (await validateFileType(req.files.image.tempFilePath)) {
        const message = await validateFileType(req.files.image.tempFilePath);

        await fsExtra.unlink(req.files.image.tempFilePath);

        return res.status(400).json({
          statusCode: 400,
          msg: message,
        });
      }

      if (await validateImageSize(req.files.image.tempFilePath)) {
        const message = await validateImageSize(req.files.image.tempFilePath);

        await fsExtra.unlink(req.files.image.tempFilePath);

        return res.status(400).json({
          statusCode: 400,
          msg: message,
        });
      }

      const result = await uploadUserImage(req.files.image.tempFilePath);

      await fsExtra.unlink(req.files.image.tempFilePath);

      if (user.image_id !== null) {
        await deleteImage(user.image_id);
      }

      const userUpdated = await User.findByIdAndUpdate(
        req.user.id,
        {
          image: result.secure_url,
          image_id: result.public_id,
        },
        { new: true }
      );

      const userFound = await User.findById(req.user.id).select(
        "-password -image_id"
      );

      return res.status(200).json({
        statusCode: 200,
        msg: "Profile image updated successfully!",
        data: userFound,
      });
    } else {
      return res.status(400).json({
        statusCode: 400,
        msg: "Image file is missing!",
      });
    }
  } catch (error) {
    await fsExtra.unlink(req.files.image.tempFilePath);
    console.log(error.message);
    return next("Error trying to update user profile image");
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
  updateUserImage,
};
