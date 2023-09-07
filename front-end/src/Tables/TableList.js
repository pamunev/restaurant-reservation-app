import React from "react";

function TableList({ table }) {
  return (
    <>
      <div className="card" key={table.table_id}></div>
    </>
  );
}

export default TableList;
