const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date, currentDate } = req.query;
  if (date) {
    const reservations = await reservationsService.listReservationsForDate(
      date
    );
    res.json({ data: reservations });
  } else if (currentDate) {
    const reservations = await reservationsService.listReservationsForDate(
      currentDate
    );
    res.json({ data: reservations });
  } else {
    const reservations = await reservationsService.list();
    res.json({ data: reservations });
  }
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
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
);

function peopleIsANumber(req, res, next) {
  const people = req.body.data.people;

  if (people > 0 && typeof people === "number") {
    return next();
  }
  next({
    status: 400,
    message: "Valid people property required.",
  });
}

function reservationDateIsADate(req, res, next) {
  const date = req.body.data.reservation_date;
  const valid = Date.parse(date);

  if (valid) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_date must be a valid date.",
  });
}

function reservationTimeIsATime(req, res, next) {
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  const time = req.body.data.reservation_time;
  const valid = time.match(regex);
  if (valid) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_time must be valid time.",
  });
}

function notTuesday(req, res, next) {
  const date = req.body.data.reservation_date;
  const weekday = new Date(date).getUTCDay();
  console.log("weekday", weekday);
  if (weekday === 2) {
    return next({
      status: 400,
      message: "Restaurant is closed on Tuesdays.",
    });
  }
  next();
}

function notInThePast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const today = Date.now();
  const proposedDate = new Date(
    `${reservation_date} ${reservation_time}`
  ).valueOf();
  if (proposedDate > today) {
    return next();
  }
  next({
    status: 400,
    message: "Reservation must be in the future.",
  });
}

// A function to prevent reservations before 10:30 am
// How do I parse time?
/* 
function open hours
let opening = 10:30
let closing = 21:30
If reservation_time < opening || reservation time > closing
then next(error)
otherwise, next.
*/

function isWithinOpenHours(req, res, next) {
  let openingTime = "10:30";
  let closingTime = "21:30";

  let { reservation_time } = req.body.data;
  console.log("time", reservation_time);
  if (reservation_time < openingTime || reservation_time > closingTime) {
    return next({
      status: 400,
      message: "Reservation can only be between 10:30 AM and 9:30 PM.",
    });
  }
  next();
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    reservationDateIsADate,
    reservationTimeIsATime,
    peopleIsANumber,
    notInThePast,
    notTuesday,
    isWithinOpenHours,
    asyncErrorBoundary(create),
  ],
};
