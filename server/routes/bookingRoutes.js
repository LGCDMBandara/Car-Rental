const express = require("express");
const router = express.Router();
const { createBooking, getBookings } = require("../controllers/bookingController");
const verifyFirebaseToken = require("../firebaseAuth");

router.post("/", verifyFirebaseToken, createBooking);
router.get("/", verifyFirebaseToken, getBookings);

module.exports = router;
