import React, { useState, useEffect } from "react";

function DepartAndReturn() {
  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  function handleDepartDateChange(event) {
    setDepartDate(event.target.value);
  }

  function handleReturnDateChange(event) {
    setReturnDate(event.target.value);

  }

  useEffect(() => {
    console.log(departDate);
    console.log(returnDate);

}, [departDate, returnDate]);

  return (
    <div>
      <label htmlFor="departDateInput">Departure date:</label>
      <input
        type="date"
        id="departDateInput"
        onChange={handleDepartDateChange}
      />

      <label htmlFor="returnDateInput">Return date:</label>
      <input
        type="date"
        id="returnDateInput"
        onChange={handleReturnDateChange}
      />
    </div>
  );
}

export default DepartAndReturn;
