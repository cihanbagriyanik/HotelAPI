"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | HotelAPI
----------------------------------------------------------------------------- */
//? Requaring
const Reservation = require("../models/reservation");
const Room = require("../models/room");
const User = require("../models/user");
const sendMail = require("../helpers/sendMail");

/* -------------------------------------------------------------------------- */
//? Reservation Controller:
module.exports = {
  //! GET
  list: async (req, res) => {
    /*
        #swagger.tags = ["Reservations"]
        #swagger.summary = "List Reservations"
        #swagger.description = `
            You can send query with endpoint for search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */

    const data = await res.getModelList(Reservation);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation),
      data,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    /*
        #swagger.tags = ["Reservations"]
        #swagger.summary = "Create Reservation"
    */

    /* -------------------------------------------------------------------------- */
    // //! Logined UserId
    req.body.userId = req?.user._id;

    // //!  Set default price from Room:
    if (!req.body?.price) {
      const room = await Room.findOne({ _id: req.body.roomId });
      req.body.price = room.price; // Doğru alanı atadık: req.body.price
      // console.log(room);
    }

    // //! Calculate total Price:
    req.body.total_price = req.body.night * req.body.price;

    /* -------------------------------------------------------------------------- */

    const data = await Reservation.create(req.body);
    const dataUser = await User.findOne(data.userId);

    sendMail(
      // to:
      dataUser.email,
      // subject:
      "Welcome",
      // Message:
      `
          <h1>Welcome to Bla Bla Hotel</h1>
          <p>Dear <b>${dataUser.username}</b>, thank you for your reservation!</p>
      `
    );

    res.status(201).send({
      error: false,
      data,
    });
  },

  //! /:id -> GET
  read: async (req, res) => {
    /*
        #swagger.tags = ["Reservations"]
        #swagger.summary = "Get Single Reservation"
    */

    const data = await Reservation.findOne({ _id: req.params.id });
    // .populate("reservationId");

    res.status(200).send({
      error: false,
      data,
    });
  },

  //! /:id -> PUT / PATCH
  update: async (req, res) => {
    /*
        #swagger.tags = ["Reservations"]
        #swagger.summary = "Update Reservation"
    */

    /* -------------------------------------------------------------------------- */
    // //! Logined UserId
    req.body.userId = req?.user._id;

    // //!  Set default price from Room:
    if (!req.body?.price) {
      const room = await Room.findOne({ _id: req.body.roomId });
      req.body.price = room.price; // Doğru alanı atadık: req.body.price
      // console.log(room);
    }

    // //! Calculate total Price:
    req.body.total_price = req.body.night * req.body.price;

    /* -------------------------------------------------------------------------- */

    const data = await Reservation.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Reservation.findOne({ _id: req.params.id }),
    });
  },

  //! /:id -> DELETE
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Reservations"]
        #swagger.summary = "Delete Reservation"
    */

    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
