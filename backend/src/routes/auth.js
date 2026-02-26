const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

/**
 * Auth Routes
 * -----------
 * Defines authentication-related endpoints.
 * Includes a test protected route to verify JWT middleware functionality (US-103).
 */

router.post('/register', authController.register);
router.post('/login', authController.login);

// Temporary protected test route used to validate JWT authentication flow
router.get('/test', authenticate, (req, res) => {
  res.json({ message: 'Protected route works!', userId: req.userId });
});

module.exports = router;