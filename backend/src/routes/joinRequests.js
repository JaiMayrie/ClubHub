const express = require('express');
const router = express.Router();
const joinRequestController = require('../controllers/joinRequestController');
const { authenticate } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authenticate);

// Submit join request
router.post('/', joinRequestController.submitJoinRequest);

// Get current user's join requests
router.get('/my-requests', joinRequestController.getMyJoinRequests);

// Update join request status (approve/reject)
router.patch('/:id', joinRequestController.updateJoinRequestStatus);

module.exports = router;
