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

if (process.env.NODE_ENV !== 'test' && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required but not set');
}

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

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// IMPORT ROUTES AFTER APP IS CREATED
const authRoutes = require('./routes/auth');
const clubRoutes = require('./routes/clubs');
const joinRequestRoutes = require('./routes/joinRequests');
const membershipRoutes = require('./routes/memberships');

// Auth routes
app.use('/api/auth', authRoutes);

// Club routes
app.use('/api/clubs', clubRoutes);

// Join request routes
app.use('/api/join-requests', joinRequestRoutes);

// Membership routes
app.use('/api/memberships', membershipRoutes);

// 404 handler — catches any route that didn't match above
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Cannot ${req.method} ${req.path}`,
  });
});

// Global error handler — catches any error passed via next(err)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred';

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Prevent Jest from auto-starting server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
