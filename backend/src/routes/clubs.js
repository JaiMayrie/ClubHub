const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');

// GET all clubs
router.get('/:id', clubController.getClubById);

module.exports = router;