const express = require("express");
const router = express.Router();
const clubController = require("../controllers/clubController");
const { authenticate } = require("../middleware/authMiddleware");
const memberController = require("../controllers/memberController");

// Public routes
router.get("/", clubController.getAllClubs);

// Protected specific routes (MUST be BEFORE /:id or they get swallowed)
router.get("/my-clubs", authenticate, clubController.getMyClubs);

// Dynamic route (AFTER specific routes)
router.get("/:id", clubController.getClubById);

// Join requests for a club (admin only)
router.get("/:id/join-requests", authenticate, clubController.getClubJoinRequests);

// Members
router.get("/:id/members", authenticate, memberController.getClubMembers);
router.delete("/:id/members/:userId", authenticate, memberController.removeClubMember);

// Create / update club (admin only)
router.post("/", authenticate, clubController.createClub);
router.patch("/:id", authenticate, clubController.updateClub);

module.exports = router;
