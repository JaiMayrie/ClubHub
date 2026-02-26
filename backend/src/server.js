const express = require('express');
const cors = require('cors');
require('dotenv').config();

/** 
 * Main Server Entry Point 
 * ----------------------- 
 * Initializes Express app, middleware, routes, *
 * and starts the backend server.
 */

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route (endpoint for monitoring tools)
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "ClubHub API is running",
    timestamp: new Date().toISOString(),
  });
});

//Test route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to ClubHub API" });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Prevent Jest from auto-starting server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;