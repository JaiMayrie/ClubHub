const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");

/**
 * Auth Routes
 * -----------
 * Defines authentication-related endpoints.
 * Includes a protected route to verify JWT middleware functionality (US-103).
 */

router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected route for current authenticated user's profile
router.get("/me", authenticate, authController.getMe);

module.exports = router;
