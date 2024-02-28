"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | PizzaAPI
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const reservation = require("../controllers/reservation");

const { isLogin } = require("../middlewares/permissions");
/* -------------------------------------------------------------------------- */
//! URL: /reservations

router.use(isLogin);

router.route("/").get(reservation.list).post(reservation.create);

router
  .route("/:id")
  .get(reservation.read)
  .put(reservation.update)
  .patch(reservation.update)
  .delete(reservation.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
