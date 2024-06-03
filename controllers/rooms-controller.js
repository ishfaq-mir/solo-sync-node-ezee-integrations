const axios = require("axios");
const xml2js = require("xml2js");
const util = require("util");

class Rooms {
  async roomRates(checkIn, checkOut, hotelCode) {
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
      const parseStringPromise = util.promisify(
        parser.parseString.bind(parser)
      );
      const result = await parseStringPromise(xmlData);
      const json = JSON.stringify(result, null, 2);

      const rateType =
        JSON.parse(json)["RES_Response"]["RoomInfo"][0]["Source"][0][
          "RoomTypes"
        ][0]["RateType"];

      return json;
    } catch (error) {
      throw new Error(error);
    }
  }
  async allRooms(from_date, to_date, property) {
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
      throw new Error(error);
    }
  }

  async roomInventory(propertyCode, checkIn, checkOut) {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }
  async roomsInformation(checkIn, checkOut, propertyCode) {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = { Rooms };
