const axios = require("axios");
const fs = require("fs");
const xml2js = require("xml2js");
const util = require("util");
const dayjs = require("dayjs");

async function roomRates(checkIn, checkOut, hotelCode) {
  try {
    let paramters = `<RES_Request>\n
   <Request_Type>Rate</Request_Type>\n
   <Authentication>\n
    <HotelCode>${hotelCode}</HotelCode>\n
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
    const xmlData = response.data;
    const parser = new xml2js.Parser();
    const parseStringPromise = util.promisify(parser.parseString.bind(parser));
    const result = await parseStringPromise(xmlData);
    const json = JSON.stringify(result, null, 2);

    const rateType =
      JSON.parse(json)["RES_Response"]["RoomInfo"][0]["Source"][0][
        "RoomTypes"
      ][0]["RateType"];

    console.log(rateType);

    return json;
  } catch (error) {
    console.log("Error while getting room rates", error);
  }
}

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

    await roomRates(from_date, to_date, propertyDict[property]);
    return data.Success.RoomList;
  } catch (error) {
    console.log("error while getting available room", error);
  }
}

async function roomInventory(propertyCode) {
  const checkIn = dayjs().format("YYYY-MM-DD");
  const checkOut = dayjs()
    .add(process.env.EZEE_ROOM_INVENTORY_DAYS, "day")
    .format("YYYY-MM-DD");
  console.log(checkIn, checkOut);
  let data = `<RES_Request>\n    <Request_Type>Inventory</Request_Type>\n    <Authentication>\n        <HotelCode>${propertyCode}</HotelCode>\n        <AuthCode>${process.env.EZEE_AUTH_CODE}</AuthCode>\n    </Authentication>\n    <FromDate>${checkIn}</FromDate>\n    <ToDate>${checkOut}</ToDate>\n</RES_Request>`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.EZEE_BASE_URL}pmsinterface/getdataAPI.php`,
    headers: {
      "Content-Type": "application/xml",
      Cookie: process.env.EZEE_COOKIE,
    },
    data,
  };

  const response = await axios.request(config);
  return response.data;
}

async function roomsInformation(checkIn, checkOut, propertyCode) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.EZEE_BASE_URL}booking/reservation_api/listing.php?request_type=RoomList&HotelCode=${propertyCode}&APIKey=${process.env.EZEE_AUTH_CODE}&check_in_date=${checkIn}&check_out_date=${checkOut}`,
    headers: {
      Cookie: process.env.EZEE_COOKIE,
    },
  };

  const response = await axios.request(config);
  return response.data;
}

function getNextDate(startDate) {
  if (startDate) {
    currentDate = dayjs(startDate);
  }
  currentDate = currentDate.add(5, "day");
  return currentDate.format("YYYY-MM-DD");
}
module.exports = { roomsInformation, roomInventory, roomRates };
