import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TablesForm() {
  let history = useHistory();

  let [formData, setFormData] = useState({
    table_name: "",
    capacity: "",
  });

  const [tableError, setTableError] = useState(false);

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "capacity") {
      value = Number(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createTable(formData, abortController.signal);
      history.push(`/dashboard`);
    } catch (error) {
      setTableError(error);
    }
    return () => abortController.abort();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <>
      <ErrorAlert error={tableError} />
      <form>
        <label htmlFor="table_name">Table name:</label>
        <input
          name="table_name"
          id="table_name"
          type="text"
          className="ml-2 mt-2"
          minlength="2"
          value={formData.table_name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="capacity">Capacity:</label>
        <input
          name="capacity"
          id="capacity"
          type="number"
          className="ml-2 mt-2"
          min="1"
          value={formData.capacity}
          onChange={handleChange}
        />
        <br />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
}

export default TablesForm;
