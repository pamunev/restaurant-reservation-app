import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationDetail({ res }) {
  const [reservation, setReservation] = useState(res);
  const [error, setError] = useState(null);
  const history = useHistory();
  let reservation_id = res.reservation_id;

  useEffect(() => {
    setReservation(reservation);
  }, [reservation, history]);

  return (
    <>
      <ErrorAlert error={error} />
      <tr>
        <th scope="row"> {reservation.reservation_id} </th>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.people}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </td>
        <td>
          <a
            href={`/reservations/${reservation_id}/seat`}
            className="btn btn-primary"
          >
            Seat
          </a>
        </td>
      </tr>
    </>
  );
}

export default ReservationDetail;
