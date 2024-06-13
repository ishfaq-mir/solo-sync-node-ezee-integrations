require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const roomsRouter = require("./routes/rooms");
const paymentsRouter = require("./routes/payments-route");
const bookingRouter = require("./routes/bookings-route");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const tokenRouter = require("./routes/tokens-route");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const validateABookingToken = async function (req, res, next) {
  try {
    console.log("here are your headers", req.rawHeaders);
    const bearer = req.rawHeaders[3];
    const splitter = bearer.split(" ");
    const incomingValue = jwt
      .verify(splitter[1], process.env.JWT_PRIVATE_KEY)
      .split("_");
    const incominPayload = incomingValue[0];

    console.log("incomingPayload", incominPayload);
    let localToken = await fs.readFile("auth.txt");
    const verifiedLocalPayload = jwt
      .verify(localToken.toString(), process.env.JWT_PRIVATE_KEY)
      .split("_")[0];

    console.log("verifiedLocalPayload", verifiedLocalPayload);

    if (incominPayload !== verifiedLocalPayload) {
      throw new Error("Authentication Failed");
    }

    next();
  } catch (error) {
    res.status(401).json({ status: "error", message: error.message });
  }
};

app.use(limiter);
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/rooms", roomsRouter);
app.use("/payments", paymentsRouter);
app.use("/booking", validateABookingToken, bookingRouter);
app.use("/token", tokenRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
