/**
 * Here I will make a form.
 * -- useState
 * -- change handler
 * -- submit handler
 * -- cancel handler?
 * -- useEffect?
 *
 * Submit button:
 * - need submit handler
 * -- saves new res,
 * ---- How do I save this into the database?
 * -- takes you to /dashboard page for date of this res.
 *
 * Cancel button:
 * - need click handler
 * -- takes you to previous page. history?
 */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

const axios = require("axios");

function NewReservation() {
  const history = useHistory();

  const [newReservation, setNewReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  const [reservationError, setReservationError] = useState(false);

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "people") {
      value = Number(value);
    }
    setNewReservation((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createReservation(newReservation, abortController.signal);
      history.push(`/dashboard?date=${newReservation.reservation_date}`);
    } catch (error) {
      setReservationError(error);
    }
    return () => abortController.abort();
  };

  const handleCancel = (event) => {
    history.goBack();
  };

  console.log("current value of form:", newReservation);

  return (
    <>
      <h2>New Reservation</h2>
      <ErrorAlert error={reservationError} />
      <ReservationForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        history={history}
        reservation={newReservation}
      />
    </>
  );
}

export default NewReservation;
