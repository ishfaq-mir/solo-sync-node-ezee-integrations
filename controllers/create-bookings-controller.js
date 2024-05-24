const axios = require("axios");
async function createABooking() {
  try {
    // const apiHead =
  } catch (error) {
    throw new Error(error);
  }
}

async function allRooms(checkIn, checkOut, property) {
  try {
    let propertyDict = {
      "Dal Lake": 46138,
    };
    let data = JSON.stringify({
      RES_Request: {
        Request_Type: "RoomAvailability",
        Authentication: {
          HotelCode: propertyDict[property],
          AuthCode: process.env.EZEE_AUTH_CODE,
        },
        RoomData: {
          from_date: "2024-05-26",
          to_date: "2024-05-27",
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
      data: data,
    };

    // axios
    //   .request(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    const apiData = await axios(config);
  } catch (error) {}
}

module.exports = { createABooking, allRooms };
