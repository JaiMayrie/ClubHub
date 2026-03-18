const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');
const { authenticate } = require('../middleware/authMiddleware');

// GET all clubs
router.get('/', clubController.getAllClubs);
router.get('/:id', clubController.getClubById);

router.post('/', authenticate, clubController.createClub);

module.exports = router;