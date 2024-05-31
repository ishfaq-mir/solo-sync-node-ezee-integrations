const express = require("express");
const router = express.Router();
const { order } = require("../controllers/payment.controller");

router.get("/", async function (req, res, next) {
  res.json({
    status: "success",
  });
});

router.post("/order", async function (req, res, next) {
  try {
    const { body } = req;
    res.json({
      status: "success",
      paymentId: await order(body),
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
