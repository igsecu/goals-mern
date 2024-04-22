const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const router = require("./routes/goalRoutes");

const connectDb = require("./config/db");

// Connect to Mongo
connectDb();

// Body-Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Res Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Router middleware
app.use("/api/goals", router);

// Error catching endware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).json({
    statusCode: status,
    msg: message,
  });
});

// Initialized Express Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
