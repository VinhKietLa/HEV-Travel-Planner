import React, { useState, useEffect } from "react";
import FlightsCSS from "../../styles/flights.css";
import "bootstrap/dist/css/bootstrap.min.css";

function FromAndToInputs() {
  // react hooks
  const [fromCity, setFromCity] = useState("");
  const [apiFromCity, setApiFromCity] = useState("");

  //not using the variables, may need them for later when generating cards.
  const [departureAirportIata, setDepartureAirportIata] = useState("");
  const [arrivaleAirportIata, arrivalAirportIata] = useState("");

  useEffect(() => {
    function handleFromInputChange(event) {
      const input = event.target.value;
      // Fetch city suggestions from Airlabs API
      const queryURL = `https://airlabs.co/api/v9/suggest?q=${input}&api_key=9dc705cb-3e98-479d-9e62-a38e26bc2f97`;
      fetch(queryURL)
        .then((response) => response.json())
        .then((response) => {
          let cities = response.response.airports;

          // Clear existing suggestions
          setFromCity("");

          // Add new suggestions to the datalist element.
          const options = cities.map((city) => (
            <option
              key={`${city.name}-${city.iata_code}`}
              value={`${city.name} ${city.iata_code}`}
              onClick={() => handleOptionClick(city)}
            >
              {`${city.name} (${city.iata_code})`}
            </option>
          ));
          //Updating options elements/setting state
          setFromCity(options);
        });
    }

    // This function is called when an `option` element is clicked and sets the `fromCity` and `departureAirportIata`
    function handleOptionClick(city) {
      setApiFromCity(city.iata_code);
      setDepartureAirportIata(city.iata_code);
    }
    // Selects the `#cityFromInput` element from the DOM.
    const cityFromInput = document.querySelector("#cityFromInput");

    // This adds an `input` event listener to the `#cityFromInput` element that calls the `handleFromInputChange` function
    // whenever the input value changes.

    cityFromInput.addEventListener("input", handleFromInputChange);
  }, []);

  useEffect(() => {
    function handleToInputChange(event) {
      const input = event.target.value;
      console.log(input);
      // Fetch city suggestions from Airlabs API
      const queryURL = `https://airlabs.co/api/v9/suggest?q=${input}&api_key=9dc705cb-3e98-479d-9e62-a38e26bc2f97`;
      fetch(queryURL)
        .then((response) => response.json())
        .then((response) => {
          console.log(input);
          console.log(response);
          let cities = response.response.airports;

          // Clear existing suggestions
          setApiFromCity("");

          // Add new suggestions to the datalist element.
          const options = cities.map((city) => (
            <option
              key={`${city.name}-${city.iata_code}`}
              value={`${city.name} ${city.iata_code}`}
              onClick={() => handleOptionClick(city)}
            >
              {`${city.name} (${city.iata_code})`}
            </option>
          ));
          //Updating options element/setting state
          setApiFromCity(options);
        });
    }
    // This function is called when an `option` element is clicked and sets the `apiFromCity` and `departureAirportIata`

    function handleOptionClick(city) {
      console.log(city);
      setApiFromCity(city.iata_code);
      arrivalAirportIata(city.iata_code);
    }
    // Selects the `#cityToInput` element from the DOM.
    const cityToInput = document.querySelector("#cityToInput");

    // This adds an `input` event listener to the `#cityFromInput` element that calls the `handleFromInputChange` function
    // whenever the input value changes.
    cityToInput.addEventListener("input", handleToInputChange);

    // return () => {
    //   cityToInput.removeEventListener("input", handleToInputChange);
    // };
  }, []);

  //Checking whether the state variables have been properly updated to be used for generating cards.
  useEffect(() => {
    console.log(apiFromCity);
  }, [apiFromCity]);

  return (
    <>
      <div>
        <h1 className="heading">Ready to Fly?</h1>
      </div>
      <h2 className="heading">What city are you flying from?</h2>
      <div>
        <form className="autocomplete">
          {/*From input field */}.<label htmlFor="cityFromInput">From</label>
          <input type="text" id="cityFromInput" list="cityFromSuggestidons" />
          {/*Generated options for change of state*/}.
          <datalist id="cityFromSuggestions">{fromCity}</datalist>
          {/*To input field */}.<label htmlFor="cityFromInput">To</label>
          <input type="text" id="cityToInput" list="cityToInput" />
          {/*Generated options for change of state*/}.
          <datalist id="cityToSuggestions">{apiFromCity}</datalist>
        </form>
      </div>
    </>
  );
}

export default FromAndToInputs;
