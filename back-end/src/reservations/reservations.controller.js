const reservationsService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date, currentDate } = req.query
  if (date) {
    const reservations = await reservationsService.listReservationsForDate(date)
    res.json({ data: reservations });
  } else if (currentDate) {
    const reservations = await reservationsService.listReservationsForDate(currentDate)
    res.json({ data: reservations })
  } else {
    const reservations = await reservationsService.list()
    res.json({ data: reservations })
  }
  
}

async function create (req, res) {
  const data = await reservationsService.create(req.body.data)
  res.status(201).json({ data })
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create),
  
};
