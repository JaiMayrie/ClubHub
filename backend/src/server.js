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