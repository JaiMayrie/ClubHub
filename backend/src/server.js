<<<<<<< HEAD
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "ClubHub API is running",
    timestamp: new Date().toISOString(),
  });
});

// Test route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to ClubHub API" });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
=======
const express = require('express');
const cors = require('cors');
require('dotenv').config();

/**
 * Main Server Entry Point
 * -----------------------
 * Initializes Express app, middleware, routes,
 * and starts the backend server.
 */

const app = express();

app.use(cors());
app.use(express.json());

//Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
>>>>>>> 4fa7f5f (Complete backend setup + auth + testing)
