const express = require("express");
const router = express.Router();
const clubController = require("../controllers/clubController");

// Public routes only for now
router.get("/", clubController.getAllClubs);
router.get("/:id", clubController.getClubById);

module.exports = router;