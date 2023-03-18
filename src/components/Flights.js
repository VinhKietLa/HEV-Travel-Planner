import React from "react";
import "../styles/flights.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FromAndToInputs from "./flightsComponents/FromAndToInputs.js";
import DepartAndReturn from "./flightsComponents/DepartAndReturnInputs.js";
function Flights() {
  
  return (
    <>
  <div className="container">
  <form id = "autoComplete">
 <FromAndToInputs/>
 <DepartAndReturn/>
 </form>
 </div>
    </>
  );
}

export default Flights;
