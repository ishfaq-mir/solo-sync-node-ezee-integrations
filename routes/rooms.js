const express = require("express");
const router = express.Router();

const {
  roomInventory,
  roomsInformation,
} = require("../controllers/rooms-controller");

router.get("/", async function (req, res, next) {
  const { checkIn, checkOut, property } = req?.query;
  const hostelsDict = {
    "Dal Lake": 46138,
  };

  res.json({
    status: "success",
    data: await roomsInformation(checkIn, checkOut, hostelsDict[property]),
  });
});

// router.get("/rates", async function (req, res, next) {
//   const { checkIn, checkOut, property } = req?.query;

//   const hostelsDict = {
//     "Dal Lake": 46138,
//   };

//   const data = await roomRates(checkIn, checkOut, hostelsDict[property]);

//   res.json({ message: "success", data: JSON.parse(data) });
// });

router.get("/inventory", async function (req, res, next) {
  const { property } = req?.query;
  const hostelsDict = {
    "Dal Lake": 46138,
  };

  const inventory = await roomInventory(hostelsDict[property]);
  console.log("its inventory", inventory);
  res.send(inventory);
  // res.json({ message: "success", data: inventory });
});
module.exports = router;
