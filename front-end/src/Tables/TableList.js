import React from "react";
import ErrorAlert from "../layout/ErrorAlert";

function TableList({ table }) {
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
        </div>
      </div>
    </>
  );
}

export default TableList;
