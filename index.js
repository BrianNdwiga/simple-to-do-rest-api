require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");
const config = require("dotenv");
config.config();
const configValues = process.env;

require("dotenv").config();

const app = express();
const PORT = configValues.PORT || 5000;

// CORS configuration
const allowedOrigins = configValues.ORIGIN; // Replace with your frontend URLs

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps or Postman)
    if (!origin) return callback(null, true);

    // Check if the origin is in the allowed list
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('The CORS policy does not allow access from the specified origin'), false);
    }

    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies if needed
}));

app.use(express.json());
app.use("/api/todos", routes);

// MongoDB connection
if (configValues.NODE_ENV !== "test") {
  mongoose
    .connect(configValues.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Database connection error:", err));
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

module.exports = app;
