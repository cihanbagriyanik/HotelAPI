"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | HotelAPI
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

/* -------------------------------------------------------------------------- */
// {
//     "roomId": "65dfb6dd5ae11e53a46f1080",
//     "arrivalDate": "01.01.2024",
//     "departureDate": "01.10.2024",
//     "guestNumber": 2,
//     "night": 10,
//     "price": 0
//     "totalPrice": 0
// }
/* -------------------------------------------------------------------------- */
//? Reservation Model:
const ReservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
      required: true,
    },
    arrivalDate: {
      type: String,
      trim: true,
      required: true,
    },
    departureDate: {
      type: String,
      trim: true,
      required: true,
    },

    guestNumber: {
      type: Number,
      trim: true,
      required: true,
    },

    night: {
      type: Number,
      trim: true,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "reservations",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Reservation", ReservationSchema);
