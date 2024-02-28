"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | HotelAPI
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");
/* -------------------------------------------------------------------------- */
// {
//     "room_number": 1,
//     "image": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "bed_type": "Double Bed",
//     "price": 100
// }
/* -------------------------------------------------------------------------- */
//? Room Model:
const RoomSchema = new mongoose.Schema(
  {
    room_number: {
      type: Number,
      trim: true,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      trim: true,
    },

    bed_type: {
      type: String,
      trim: true,
      required: true,
      enum: ["Single Bed", "Twin Bed", "Double Bed", "King Bed"],
    },

    price: {
      type: Number,
      required: true,
    },
  },

  {
    collection: "rooms",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Room", RoomSchema);
