const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const { Token } = require("../controllers/token-controller");

// router.get("/", async function (req, res, next) {
//   const token = jwt.sign(
//     process.env.JWT_PAYLOAD + "_" + Math.random(),
//     process.env.JWT_PRIVATE_KEY
//   );

//   res.json({
//     token,
//   });
// });
router.get("/", async function (req, res, next) {
  const token = await new Token().mintToken();

  res.json({
    token,
  });
});

module.exports = router;
