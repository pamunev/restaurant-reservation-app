const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .then((result) => result[0]);
}

function list() {
  return knex("reservations").select("*").orderBy("reservation_time");
}

function listReservationsForDate(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function createTable(table) {
  return knex("tables")
    .insert(table)
    .select("*")
    .then((createdRecords) => createdRecords[0]);
}

function updateResStatus(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status: status }, "*");
}

function listTables() {
  return knex("tables").select("*").orderBy("table_name");
}

module.exports = {
  create,
  read,
  updateResStatus,
  list,
  listReservationsForDate,
  createTable,
  listTables,
};
