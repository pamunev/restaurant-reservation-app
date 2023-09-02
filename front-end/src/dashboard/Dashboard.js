import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { previous, next } from "../utils/date-time"
import ErrorAlert from "../layout/ErrorAlert";
import { useLocation, useHistory } from "react-router-dom"
import useQuery from "../utils/useQuery";
import ReservationDetail from "../NewReservation/ReservationDetail";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [currentDate, setCurrentDate] = useState(date)

  const history = useHistory()
  const location = useLocation()
  const searchedDate = location.search.slice(-10)

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(() => {
    const abortController = new AbortController()

    async function loadReservations() {
      try {
        if (currentDate === date) {
          const returnedReservations = await listReservations({ date }, abortController.signal)
          setReservations(returnedReservations)
        } else {
          const returnedReservations = await listReservations({ currentDate }, abortController.signal)
          setReservations(returnedReservations)
        }
      } catch (error) {
        setReservationsError(error)
      }
    }
    loadReservations()
    return () => abortController.abort()
  }, [date, currentDate, history.location])

  // Fetching the query parameter
  useEffect(() => {
    if (searchedDate && searchedDate !== "") {
      setCurrentDate(searchedDate);
    }
  }, [searchedDate, history])

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {currentDate}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <table className="table table-striped">
        <tbody>
          {reservations.map((res) => (
            <ReservationDetail res={res} key={res.reservation_id} />
          ))}
        </tbody>
      </table>
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
