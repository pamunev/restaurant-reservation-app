import React, { useState } from "react";
import "../App.css";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SearchForm() {
  const [numberToBeSearched, setNumberToBeSearched] = useState({
    mobile_number: "",
  });
  const [reservation, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNumberToBeSearched((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const returnedReservations = await listReservations(
        numberToBeSearched,
        abortController.signal
      );
      setReservations(returnedReservations);
    } catch (error) {
      setReservationsError(error);
    }
    return () => abortController.abort();
  };

  console.log("current phone number to search:", numberToBeSearched);

  return (
    <>
      <ErrorAlert error={reservationsError} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="mobile_number">Phone number:</label>
        <input
          name="mobile_number"
          type="tel"
          value={numberToBeSearched.value}
          pattern="[0-9]{10}"
          placeholder="Enter a customer's phone number"
          minLength="10"
          maxLength="10"
          className="ml-2 search-input-field"
          onChange={handleChange}
        />
        <br />
        <button>Find</button>
      </form>
    </>
  );
}

export default SearchForm;
