"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | HotelAPI
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const room = require("../controllers/room");

const { isAdmin } = require("../middlewares/permissions");
/* -------------------------------------------------------------------------- */
//! URL: /rooms

router.use(isAdmin);

router.route("/").get(room.list).post(room.create);

router
  .route("/:id")
  .get(room.read)
  .put(room.update)
  .patch(room.update)
  .delete(room.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
