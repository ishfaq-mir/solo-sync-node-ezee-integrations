const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Booking } = require("../controllers/create-bookings-controller");
// const { createABooking } = require("../controllers/create-bookings-controller");

// router.post("/", async function (req, res, next) {
//   try {
//     const bookingResponse = await createABooking(req.body);

//     res.json({
//       ...bookingResponse,
//     });
//   } catch (error) {
//     return res.status(500).json({ status: "error", message: error.message });
//   }
// });

router.post("/", async function (req, res, next) {
  try {
    const booking = new Booking();
    res.json({ ...(await booking.createABooking(req.body)) });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
