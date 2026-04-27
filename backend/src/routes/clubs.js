const express = require("express");
const router = express.Router();
const clubController = require("../controllers/clubController");
const joinRequestController = require("../controllers/joinRequestController");
const memberController = require("../controllers/memberController");
const { authenticate } = require("../middleware/authMiddleware");

// Public routes
router.get("/", clubController.getAllClubs);

// Protected routes
router.get("/my-clubs", authenticate, clubController.getMyClubs);
router.post("/", authenticate, clubController.createClub);
router.get("/:id", clubController.getClubById);
router.patch("/:id", authenticate, clubController.updateClub);
router.get("/:id/members", authenticate, memberController.getClubMembers);
router.get(
  "/:id/join-requests",
  authenticate,
  joinRequestController.getClubJoinRequests,
);

module.exports = router;
