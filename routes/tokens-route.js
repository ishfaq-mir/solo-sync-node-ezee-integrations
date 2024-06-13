const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", async function (req, res, next) {
  const token = jwt.sign(
    process.env.JWT_PAYLOAD + "_" + Math.random(),
    process.env.JWT_PRIVATE_KEY
  );

  res.json({
    token,
  });
});

module.exports = router;
