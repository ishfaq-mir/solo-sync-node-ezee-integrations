const express = require("express");
const router = express.Router();
const axios = require("axios");
const xml = require("xml");
const { allRooms, roomRates } = require("../controllers/rooms-controller");

router.get("/", async function (req, res, next) {
  const { checkIn, checkOut, property } = req?.query;

  res.json({
    status: "success",
    data: await allRooms(checkIn, checkOut, property),
  });
});

router.get("/rates", async function (req, res, next) {
  const { checkIn, checkOut, property } = req?.query;

  const data = await roomRates(checkIn, checkOut, property);
  console.log(data);

  res.set("Content-Type", "text/xml");
  res.send(data);
});
module.exports = router;
