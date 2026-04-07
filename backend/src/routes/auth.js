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
router.get("/profile", authenticate, authController.getProfile);

// Additional protected routes for updating profile and changing password
router.patch("/profile", authenticate, authController.updateProfile);
router.patch("/password", authenticate, authController.changePassword);

// Public profile — view any user's profile (authenticated)
router.get("/users/:id", authenticate, authController.getPublicProfile);

module.exports = router;
