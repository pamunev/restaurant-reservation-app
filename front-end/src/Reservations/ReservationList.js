import React from "react";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationList(reservation) {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div>
            Name {reservation.first_name} {reservation.last_name}
          </div>
          <ul>
            <li>{reservation.people}</li>
            <li>{reservation.mobile_number}</li>
            <li>{reservation.reservation_date}</li>
            <li>{reservation.reservation_time}</li>
            <li data-reservation-id-status={reservation.reservation_id}>
              {reservation.status}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ReservationList;
