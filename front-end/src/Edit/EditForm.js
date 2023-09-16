import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "../Reservations/ReservationForm";

function EditForm() {
  const { reservation_id } = useParams();
  const [currentReservation, setCurrentReservation] = useState({
    reservation_id,
  });
  const [error, setError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    async function loadReservation() {
      try {
        let returnedReservation = await getReservation(reservation_id);
        setCurrentReservation({
          ...returnedReservation,
          people: Number(returnedReservation.people),
        });
      } catch (error) {
        setError(error);
      }
    }
    loadReservation();
    return () => abortController.abort();
  }, [reservation_id]);

  return (
    <>
      <ErrorAlert error={error} />
      <ReservationForm history={history} reservation={currentReservation} />
    </>
  );
}

export default EditForm;
