const reservationsService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")

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

// Validation Middleware

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "reservation_time",
  "people"
)

function hasMobileNumber(req, res, next) {
  const phone = req.body.data.mobile_number
  if (phone) {
    return next()
  }
  next({
    status: 400,
    message: "mobile_number property required."
  })
}

function peopleIsANumber() {

}

function reservationDateIsADate() {

}

function reservationTimeIsATime() {

}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties, 
    hasMobileNumber,
    asyncErrorBoundary(create)],
  
};
