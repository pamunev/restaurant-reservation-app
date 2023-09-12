import React from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { deleteTableAssignment } from "../utils/api";

function TableList({ table, refreshTables }) {
  const handleFinishTable = async (event) => {
    const abortController = new AbortController();

    if (
      window.confirm(
        `Is this table ready to seat new guests? This cannot be undone.`
      )
    ) {
      try {
        await deleteTableAssignment(table.table_id, abortController.signal);
        refreshTables();
      } catch (error) {
        console.error("Error finishing table:", error);
      }
    }
  };

  return (
    <>
      <div className="card" key={table.table_id}>
        <div className="card-header">
          <h5 className="card-title">{table.table_name}</h5>
        </div>
        <div className="card-body">
          <p>Capacity: {table.capacity}</p>
          <p data-table-id-status={table.table_id}>
            {table.reservation_id ? "occupied" : "free"}
          </p>
          {table.reservation_id && (
            <button
              data-table-id-finish={table.table_id}
              className="btn bottom-button-cancel"
              onClick={handleFinishTable}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default TableList;
