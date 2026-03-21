const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');
const { authenticate } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authenticate);

// Get current user's memberships
router.get('/my-memberships', membershipController.getMyMemberships);

// Leave a club
router.delete('/:clubId', membershipController.leaveClub);

module.exports = router;
