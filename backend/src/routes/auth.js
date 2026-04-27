const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authController = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "../../uploads/avatars")),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${req.userId}-${Date.now()}${ext}`);
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, WebP, and GIF images are allowed"));
    }
  },
});

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
router.post(
  "/avatar",
  authenticate,
  uploadAvatar.single("avatar"),
  authController.uploadAvatar,
);

// Public profile — view any user's profile (authenticated)
router.get("/users/:id", authenticate, authController.getPublicProfile);

module.exports = router;
