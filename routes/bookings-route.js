// const express = require("express");
// const router = express.Router();
// const axios = require("axios");
// const FormData = require("form-data");

const express = require("express");
const router = express.Router();
const axios = require("axios");
const FormData = require("form-data");

router.post("/legal", async function (req, res, next) {
  console.log("here booking data", req.body);
  const formData = new FormData();
  formData.append(
    "BookingData",
    JSON.stringify({
      Room_Details: {
        Room_1: {
          Rateplan_Id: "4613800000000000001", //Mandatory
          Ratetype_Id: "4613800000000000001", //Mandatory
          Roomtype_Id: "4613800000000000001", //Mandatory
          baserate: "1500.0000", //Mandatory
          extradultrate: "0.0000", //Mandatory
          extrachildrate: "0.0000", //Mandatory
          number_adults: "1", //Mandatory
          number_children: "0", //Mandatory
          ExtraChild_Age: "0", //Mandatory
          Title: "This is booking",
          First_Name: "Ishfaq", //Mandatory
          Last_Name: "Hussain", //Mandatory
          Gender: "Male",
          SpecialRequest: "",
        },
        Room_2: {
          Rateplan_Id: "4613800000000000002",
          Ratetype_Id: "4613800000000000001",
          Roomtype_Id: "4613800000000000002",
          baserate: "5000.0000",
          extradultrate: "0.0000",
          extrachildrate: "0.0000",
          number_adults: "1",
          number_children: "0",
          ExtraChild_Age: "18",
          Title: "This is booking",
          First_Name: "Ishfaq",
          Last_Name: "Hussain",
          Gender: "Male",
          SpecialRequest: "",
        },
      },
      check_in_date: "2024-05-30",
      check_out_date: "2024-05-31",
      Booking_Payment_Mode: "3",
      Email_Address: "mirishfaqhussain007@gmail.com",
      Source_Id: "",
      MobileNo: "7006202746",
      Address: "Hellowrd",
      State: "Jammu and Kashmir",
      Country: "India",
      City: "srinagar",
      Zipcode: "191113",
      Fax: "",
      Device: "",
      Languagekey: "",
      paymenttypeunkid: "",
    })
  );
  formData.append("HotelCode", `${process.env.EZEE_HOTEL_CODE}`);
  formData.append("APIKey", `${process.env.EZEE_AUTH_CODE}`);

  console.log(formData);

  axios
    .post(
      "https://live.ipms247.com/booking/reservation_api/listing.php?request_type=InsertBooking",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Cookie:
            "AWSALB=mGou11NzT6f1gFsHvuLa2oQe3ui07ozrRl7kyGpbmeMSYdRs4OieSQJgd0SuVLQgtEPKnW0/Wt4BalrQeFeLZQ3j2ByFdLfZRs/AIkdFvw2nEctSrkaV5syCbTan; AWSALBCORS=mGou11NzT6f1gFsHvuLa2oQe3ui07ozrRl7kyGpbmeMSYdRs4OieSQJgd0SuVLQgtEPKnW0/Wt4BalrQeFeLZQ3j2ByFdLfZRs/AIkdFvw2nEctSrkaV5syCbTan; PHPSESSID=i7lrcuh8qv1eehpdb0ma3vhin5; SSID=9n677qs5qbju151a6l4jnehu67",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  res.json({
    status: "success",
  });
});

// module.exports = router;

router.post("/", async function (req, res, next) {
  let roomDetailsObject = {};
  req.body.rooms.forEach((room, index) => {
    roomDetailsObject[`Room_${index + 1}`] = { ...room };
  });
  const { check_in_date, check_out_date, Booking_Payment_Mode, Email_Address } =
    req.body;

  console.log(
    check_in_date,
    check_out_date,
    Booking_Payment_Mode,
    Email_Address
  );

  const formData = new FormData();
  formData.append(
    "BookingData",
    JSON.stringify({
      Room_Details: {
        ...roomDetailsObject,
      },
      check_in_date,
      check_out_date,
      Booking_Payment_Mode,
      Email_Address,
      Source_Id: "",
      MobileNo: "7006202746",
      Address: "Hellowrd",
      State: "Jammu and Kashmir",
      Country: "India",
      City: "srinagar",
      Zipcode: "191113",
      Fax: "",
      Device: "",
      Languagekey: "",
      paymenttypeunkid: "",
    })
  );
  formData.append("HotelCode", `${process.env.EZEE_HOTEL_CODE}`);
  formData.append("APIKey", `${process.env.EZEE_AUTH_CODE}`);

  axios
    .post(
      "https://live.ipms247.com/booking/reservation_api/listing.php?request_type=InsertBooking",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Cookie:
            "AWSALB=mGou11NzT6f1gFsHvuLa2oQe3ui07ozrRl7kyGpbmeMSYdRs4OieSQJgd0SuVLQgtEPKnW0/Wt4BalrQeFeLZQ3j2ByFdLfZRs/AIkdFvw2nEctSrkaV5syCbTan; AWSALBCORS=mGou11NzT6f1gFsHvuLa2oQe3ui07ozrRl7kyGpbmeMSYdRs4OieSQJgd0SuVLQgtEPKnW0/Wt4BalrQeFeLZQ3j2ByFdLfZRs/AIkdFvw2nEctSrkaV5syCbTan; PHPSESSID=i7lrcuh8qv1eehpdb0ma3vhin5; SSID=9n677qs5qbju151a6l4jnehu67",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  res.json({
    status: "success",
  });
});

module.exports = router;
