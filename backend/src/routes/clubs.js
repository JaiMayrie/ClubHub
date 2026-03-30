const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');
const { authenticate } = require('../middleware/authMiddleware');
const memberController = require('../controllers/memberController');

// Public routes
router.get('/', clubController.getAllClubs);

// Protected specific routes (BEFORE :id)
router.get('/my-clubs', authenticate, clubController.getMyClubs);

// Dynamic route (AFTER specific routes)
router.get('/:id', clubController.getClubById);

// Get join requests for a club (admin only) - MUST BE BEFORE general :id route
router.get('/:id/join-requests', authenticate, clubController.getClubJoinRequests);
router.get('/:id/members', authenticate, memberController.getClubMembers);

// Admin-only route (create club)
router.post('/', authenticate, clubController.createClub);

router.patch('/:id', authenticate, clubController.updateClub);

module.exports = router;
