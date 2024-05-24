const axios = require("axios");
async function createABooking() {
  try {
    // const apiHead =
  } catch (error) {
    throw new Error(error);
  }
}

async function allRooms(from_date, to_date, property) {
  try {
    let propertyDict = {
      "Dal Lake": 46138,
    };
    console.log(propertyDict);
    let data = JSON.stringify({
      RES_Request: {
        Request_Type: "RoomAvailability",
        Authentication: {
          HotelCode: propertyDict[property],
          AuthCode: process.env.EZEE_AUTH_CODE,
        },
        RoomData: {
          from_date,
          to_date,
        },
      },
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.EZEE_BASE_URL}index.php/page/service.kioskconnectivity`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    const response = await axios(config);

    const responseData = JSON.stringify(response.data);
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createABooking, allRooms };
