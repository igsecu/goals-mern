require("dotenv").config();
const mongoose = require("mongoose");

let conn;

const connectDB = async () => {
  try {
    conn = await mongoose.connect(
      `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`
    );

    console.log("Connected to MongoDB!");
    return conn;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
