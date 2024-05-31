const express = require("express");
const router = express.Router();
const axios = require("axios");
const { createABooking } = require("../controllers/create-bookings-controller");

router.post("/", async function (req, res, next) {
  try {
    const bookingResponse = await createABooking(req.body);

    res.json({
      ...bookingResponse,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
