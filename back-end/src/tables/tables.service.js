const knex = require("../db/connection");

function create(table) {
  return knex("tables")
    .insert(table)
    .select("*")
    .then((createdRecords) => createdRecords[0]);
}

function readTable(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function readReservation(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

async function updateSeatRes(reservation_id, table_id) {
  const trx = await knex.transaction();
  return trx("tables")
    .where({ table_id })
    .update(
      {
        reservation_id: reservation_id,
        table_status: "occupied",
      },
      "*"
    )
    .then(() =>
      trx("reservations").where({ reservation_id }).update({ status: "seated" })
    )
    .then(trx.commit)
    .catch(trx.rollback);
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

module.exports = {
  create,
  readReservation,
  readTable,
  updateSeatRes,
  list,
};
