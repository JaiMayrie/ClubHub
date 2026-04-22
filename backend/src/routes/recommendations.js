const express = require("express");
const router = express.Router();
const { getRecommendations } = require("../controllers/recommendationController");
const { authenticate } = require("../middleware/authMiddleware");

// GET /api/recommendations — protected, students only
router.get("/", authenticate, getRecommendations);

module.exports = router;
