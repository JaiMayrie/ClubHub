const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');

// GET all clubs
router.get('/', clubController.getAllClubs);

module.exports = router;