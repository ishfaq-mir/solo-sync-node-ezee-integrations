const axios = require("axios");

async function allRooms(from_date, to_date, property) {
  try {
    let propertyDict = {
      "Dal Lake": 46138,
    };
    let parameters = JSON.stringify({
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

    console.log("here is your .ENV", process.env.EZEE_BASE_URL);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.EZEE_BASE_URL}index.php/page/service.kioskconnectivity`,
      headers: {
        "Content-Type": "application/json",
      },
      data: parameters,
    };

    const { data } = await axios(config);
    return data.Success.RoomList;
  } catch (error) {
    console.log("error while getting available room", error);
  }
}

async function roomRates(checkIn, checkOut, hotel) {
  try {
    const hotelsDict = {
      "Dal Lake": 46138,
    };
    let paramters = `<RES_Request>\n   
   <Request_Type>Rate</Request_Type>\n    
   <Authentication>\n       
    <HotelCode>${hotelsDict[hotel]}</HotelCode>\n     
    <AuthCode>${process.env.EZEE_AUTH_CODE}</AuthCode>\n   
     </Authentication>\n   
      <FromDate>${checkIn}</FromDate>\n  
    <ToDate>${checkOut}</ToDate>\n
    </RES_Request>`;

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.EZEE_BASE_URL}pmsinterface/getdataAPI.php`,
      headers: {
        "Content-Type": "application/xml",
      },
      data: paramters,
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log("Error while getting room rates", error);
  }
}

module.exports = { allRooms, roomRates };
