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

router.post("/", async function (req, res, next) {
  try {
    console.log("DEBUG");

    const {
      rooms,
      check_in_date,
      check_out_date,
      Booking_Payment_Mode,
      Email_Address,
      Source_Id,
      MobileNo,
      Address,
      State,
      Country,
      City,
      Zipcode,
      Fax,
      paymenttypeunkid,
    } = req.body;

    // Ensure rooms array is provided and not empty
    if (!rooms || rooms.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Rooms data is required" });
    }

    // Constructing Room_Details dynamically
    const Room_Details = {};
    rooms.forEach((room, index) => {
      Room_Details[`Room_${index + 1}`] = room;
    });

    const bookingData = {
      Room_Details,
      check_in_date,
      check_out_date,
      Booking_Payment_Mode,
      Email_Address,
      Source_Id,
      MobileNo,
      Address,
      State,
      Country,
      City,
      Zipcode,
      Fax,
      Device: "",
      Languagekey: "",
      paymenttypeunkid,
    };

    // Log the constructed booking data for debugging
    `console.log("BookingData:", JSON.stringify(bookingData, null, 2));`;

    const formData = new FormData();
    formData.append("BookingData", JSON.stringify(bookingData));
    formData.append("HotelCode", `${process.env.EZEE_HOTEL_CODE}`);
    formData.append("APIKey", `${process.env.EZEE_AUTH_CODE}`);

    console.log("FormData headers:", formData.getHeaders());

    const response = await axios.post(
      "https://live.ipms247.com/booking/reservation_api/listing.php?request_type=InsertBooking",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Cookie:
            "AWSALB=mGou11NzT6f1gFsHvuLa2oQe3ui07ozrRl7kyGpbmeMSYdRs4OieSQJgd0SuVLQgtEPKnW0/Wt4BalrQeFeLZQ3j2ByFdLfZRs/AIkdFvw2nEctSrkaV5syCbTan; AWSALBCORS=mGou11NzT6f1gFsHvuLa2oQe3ui07ozrRl7kyGpbmeMSYdRs4OieSQJgd0SuVLQgtEPKnW0/Wt4BalrQeFeLZQ3j2ByFdLfZRs/AIkdFvw2nEctSrkaV5syCbTan; PHPSESSID=i7lrcuh8qv1eehpdb0ma3vhin5; SSID=9n677qs5qbju151a6l4jnehu67",
        },
      }
    );

    console.log(response.data);

    res.json({
      status: "success",
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});
module.exports = router;
