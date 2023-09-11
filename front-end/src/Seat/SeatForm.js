import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { updateSeat } from "../utils/api";

function SeatForm() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [tableFormData, setTableFormData] = useState({});
  const history = useHistory();
  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    listTables().then(setTables).catch(setError);
    return () => abortController.abort();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const tableObj = JSON.parse(tableFormData);
    updateSeat(tableObj.table_id, reservation_id)
      .then((response) => {
        const newTables = tables.map((table) => {
          return table.table_id === response.table_id ? response : table;
        });
        setTables(newTables);
        history.push("/dashboard");
      })
      .catch(setError);
  };

  const handleCancel = (event) => {
    history.goBack();
  };

  return (
    <>
      <ErrorAlert error={error} />
      <form>
        <label htmlFor="table_id">Select table:</label>
        <select
          name="table_id"
          id="table_id"
          className="ml-2 mt-2"
          onChange={(event) => setTableFormData(event.target.value)}
        >
          <option value="">Table Name - Capacity</option>
          {tables.map((table) => (
            <option
              key={table.table_id}
              value={JSON.stringify(table)}
              required={true}
            >
              {table.table_name} - {table.capacity}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
}

export default SeatForm;
