const axios = require("axios");
const FormData = require("form-data");

class Booking {
  async createABooking(body) {
    try {
      this.enforceValidation(body);

      const formData = new FormData();

      let roomss = body.rooms;
      let m = {};

      roomss.forEach((r, index) => {
        m[`Room_${index + 1}`] = r;
      });

      const {
        check_in_date,
        check_out_date,
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
      } = body;
      formData.append(
        "BookingData",
        JSON.stringify({
          Room_Details: {
            ...m,
          },
          check_in_date,
          check_out_date,
          // Booking_Payment_Mode,
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
      const { ReservationNo } = response.data;
      const processFlag = await this.markBookingProcessed(ReservationNo);
      return { ...processFlag, ReservationNo };
    } catch (error) {
      throw new Error(error);
    }
  }

  enforceValidation(body) {
    const requiredFields = [
      "check_in_date",
      "check_out_date",
      "Email_Address",
      "MobileNo",
      "Address",
      "State",
      "Country",
      "City",
      "Zipcode",
      "Device",
      "Languagekey",
      "paymenttypeunkid",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (!Array.isArray(body.rooms) || body.rooms.length === 0) {
      throw new Error("Rooms must be a non-empty array");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.Email_Address)) {
      throw new Error("Invalid Email Address");
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(body.MobileNo)) {
      throw new Error("Invalid Mobile Number");
    }
  }
  async markBookingProcessed(reservationId) {
    const hotelId = 46138;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.EZEE_BASE_URL}booking/reservation_api/listing.php?request_type=ProcessBooking&HotelCode=${hotelId}&APIKey=${process.env.EZEE_AUTH_CODE}&Process_Data={"Action":"ConfirmBooking","ReservationNo":"${reservationId}","Inventory_Mode":"ALLOCATED","Error_Text":""}\n`,
      headers: {
        Cookie: process.env.EZEE_COOKIE,
      },
    };

    const response = await axios.request(config);
    return response.data;
  }
}

module.exports = { Booking };
