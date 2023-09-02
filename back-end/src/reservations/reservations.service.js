const knex = require("../db/connection")

function create(reservation) {
    return knex("reservations")
      .insert(reservation)
      .returning("*")
      .then((createdRecords) => createdRecords[0])
}

function list() {
    return knex("reservations")
      .select("*")
      .orderBy("reservation_time")
}

function listReservationsForDate(date) {
    return knex("reservations")
      .select("*")
      .where({ "reservation_date": date})
      .orderBy("reservation_time")
}


module.exports = {
    create,
    list,
    listReservationsForDate,
}