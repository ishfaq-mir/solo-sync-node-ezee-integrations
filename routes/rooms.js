const express = require("express");
const router = express.Router();

// const {
//   roomInventory,
//   roomsInformation,
//   roomRates,
// } = require("../controllers/rooms-controller");

const { Rooms } = require("../controllers/rooms-controller");

router.get("/", async function (req, res, next) {
  //valid api
  try {
    const { checkIn, checkOut, property } = req?.query;
    const hostelsDict = {
      "Dal Lake": 46138,
    };
    if (!checkIn) {
      throw new Error("Invalid check_in");
    }
    if (!checkOut) {
      throw new Error("Invalid check_out");
    }
    if (!hostelsDict[property] || !property) {
      throw new Error("Invalid property");
    }

    const roomInfo = new Rooms();
    res.json({
      status: "success",
      data: await roomInfo.roomsInformation(
        checkIn,
        checkOut,
        hostelsDict[property]
      ),
    });
  } catch (error) {
    const { message } = error.message;
    res.status(500).json({ status: "error", message });
  }
});

router.get("/rates", async function (req, res, next) {
  //not using this api
  const { checkIn, checkOut, property } = req?.query;

  const hostelsDict = {
    "Dal Lake": 46138,
  };

  const data = await roomRates(checkIn, checkOut, hostelsDict[property]);

  res.json({ message: "success", data: JSON.parse(data) });
});

router.get("/inventory", async function (req, res, next) {
  try {
    const { property, checkIn, checkOut } = req?.query;

    const hostelsDict = {
      "Dal Lake": 46138,
    };

    if (!checkIn) {
      throw new Error("Invalid check_in");
    }
    if (!checkOut) {
      throw new Error("Invalid check_out");
    }
    if (!hostelsDict[property] || !property) {
      throw new Error("Invalid property");
    }

    const roomInfo = new Rooms();

    console.log(checkIn, checkOut, property);

    const inventory = await roomInfo.roomInventory(
      hostelsDict[property],
      checkIn,
      checkOut
    );
    res.send(inventory);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
module.exports = router;
