const jwt = require('jsonwebtoken');

/**
 * Authentication Middleware (US-103 - Protected Routes)
 * ------------------------------------------------------
 * Verifies JWT token sent in Authorization header.
 * If valid, attaches user data to the request object
 * so protected routes can access authenticated user info.
 */

exports.authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if token is provided and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Extract token from header
    const token = authHeader.split(' ')[1];

    // Verify token using secret key (stored securely in env variables)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request for downstream route handlers
    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next(); // Continue to protected route

  } catch (error) {

    //Handle specific JWT errors for better client feedback
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }

    return res.status(401).json({ error: 'Invalid token' });
  }
};