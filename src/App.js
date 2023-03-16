import logo from "./logo.svg";
import "./App.css";

import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch(
      "https://api.opentripmap.com/0.1/en/places/bbox?lon_min=2.320041&lon_max=2.3200410217200766&lat_min=48.8588897&lat_max=48.8588897&rate=1&format=geojson&apikey=5ae2e3f221c38a28845f05b6165ca5f078a6cd7e01751064ebf17758"
    )
      .then((response) => response.json())
      .then((data) => console.log(data));

    // geolocation

    fetch(
      "https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=9ed27dc20b6878421a84136c5fe9e945"
    )
      .then((response) => response.json())
      .then((cities) => console.log(cities));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <p>Test</p>
      </header>
    </div>
  );
}

export default App;
