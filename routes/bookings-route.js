const express = require("express");
const router = express.Router();
const axios = require("axios");
const FormData = require("form-data");

router.post("/", async function (req, res, next) {
  const formData = new FormData();
  let roomss = req.body.rooms;

  let m = {};
  roomss.forEach((r, index) => {
    m[`Room_${index + 1}`] = r;
  });

  const {
    check_in_date,
    check_out_date,
    Booking_Payment_Mode,
    Email_Address,
    MobileNo,
    Address,
    State,
    Country,
    City,
    Zipcode,
    Fax,
    Device,
    Languagekey,
    paymenttypeunkid,
  } = req.body;
  formData.append(
    "BookingData",
    JSON.stringify({
      Room_Details: {
        ...m,
      },
      check_in_date,
      check_out_date,
      Booking_Payment_Mode,
      Email_Address,
      MobileNo,
      Address,
      State,
      Country,
      City,
      Zipcode,
      Fax,
      Device,
      Languagekey,
      paymenttypeunkid,
    })
  );
  formData.append("HotelCode", `${process.env.EZEE_HOTEL_CODE}`);
  formData.append("APIKey", `${process.env.EZEE_AUTH_CODE}`);

  const response = await axios.post(
    `${process.env.EZEE_BASE_URL}booking/reservation_api/listing.php?request_type=InsertBooking`,
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        Cookie: process.env.EZEE_COOKIE,
      },
    }
  );

  res.json({
    status: "success",
    data: response.data,
  });
});

module.exports = router;
