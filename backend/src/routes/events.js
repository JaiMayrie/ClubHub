const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/recent", eventController.getRecentEvents);
router.get("/club/:clubId", eventController.getEventsForClub);
router.post("/", authenticate, eventController.createEvent);

module.exports = router;