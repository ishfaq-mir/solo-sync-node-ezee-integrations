const express = require("express");
const router = express.Router();
const axios = require("axios");
const {
  allRooms,
  createABooking,
} = require("../controllers/create-bookings-controller");
router.get("/", async function (req, res, next) {
  const { checkIn, checkOut, property } = req?.query;

  await allRooms(checkIn, checkOut, property);

  res.json({ message: `${checkIn}, ${checkOut},${property}` });
});

module.exports = router;
