import React, { useState, useEffect } from "react";
import "../styles/flights.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Flights() {
  // From and To hooks
  const [fromCity, setFromCity] = useState("");
  const [apiFromCity, setApiFromCity] = useState("");

  // Departure date and Return date hooks
  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  //Cabin class and currency hooks
  const [flightCabin, setFlightCabin] = useState("Economy");
  const [flightCurrency, setFlightCurrency] = useState("USD");

  //Passenger hooks
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);


  //Departure date eventListener
  function handleDepartDateChange(event) {
    setDepartDate(event.target.value);
  }

  //Return date eventListener
  function handleReturnDateChange(event) {
    setReturnDate(event.target.value);
  }
  //Cabin eventListener
  const handleCabinClassChange = (event) => {
    setFlightCabin(event.target.value);
  };
  //Currency eventListener
  const handleCabinCurrencyChange = (event) => {
    setFlightCurrency(event.target.value);
  };

  //Passenger function
  const handleButtonClick = (event, passengerType) => {
    event.preventDefault();
    let value;

    if (event.target.classList.contains("plus-btn")) {
      if (passengerType === "adults") {
        value = adults + 1;
        setAdults(value);
      } else if (passengerType === "children") {
        value = children + 1;
        setChildren(value);
      } else if (passengerType === "infants") {
        value = infants + 1;
        setInfants(value);
      }
    } else if (event.target.classList.contains("minus-btn")) {
      if (passengerType === "adults" && adults > 0) {
        value = adults - 1;
        setAdults(value);
      } else if (passengerType === "children" && children > 0) {
        value = children - 1;
        setChildren(value);
      } else if (passengerType === "infants" && infants > 0) {
        value = infants - 1;
        setInfants(value);
      }
    }
  }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      getTicketPrice();
    };

    //This is the final fetch using Flights API using the parameter values taken from the form.
    const getTicketPrice = () => {
      console.log(apiFromCity)
      console.log(fromCity)

      console.log(departDate)
      console.log(returnDate)
      console.log(adults)
      console.log(children)
      console.log(infants)
      console.log(flightCabin)
      console.log(flightCurrency)

      let queryURL = `https://api.flightapi.io/roundtrip/641210a9f75e113b1880490d/${fromCity}/${apiFromCity}/${departDate}/${returnDate}/${adults}/${children}/${infants}/${flightCabin}/${flightCurrency}`;
      fetch(queryURL)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        });    
      };



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
      setFromCity(city.iata_code);
      // setDepartureAirportIata(city.iata_code);
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
      // arrivalAirportIata(city.iata_code);
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
    console.log(fromCity);
  }, [fromCity]);
  useEffect(() => {
    console.log(apiFromCity);
  }, [apiFromCity]);

  useEffect(() => {
    console.log(departDate);
    console.log(returnDate);
  }, [departDate, returnDate]);

  return (
    <>
      <div>
        <h1 className="heading">Ready to Fly?</h1>
      </div>
      <h2 className="heading">What city are you flying from?</h2>

      {/*From input field */}
      <label htmlFor="cityFromInput">From</label>
      <input type="text" id="cityFromInput" list="cityFromSuggestidons" />
      {/*Generated options for change of state*/}
      <datalist id="cityFromSuggestions">{fromCity}</datalist>
      {/*To input field */}
      <label htmlFor="cityFromInput">To</label>
      <input type="text" id="cityToInput" list="cityToInput" />
      {/*Generated options for change of state*/}
      <datalist id="cityToSuggestions">{apiFromCity}</datalist>
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

<label htmlFor="cabinClass">Cabin Class</label>
      <select
        id="cabinClass"
        value={flightCabin}
        onChange={handleCabinClassChange}
      >
        <option value="Economy">Economy</option>
        <option value="Business">Business</option>
        <option value="First">First Class</option>
      </select>

      {/* Cabin currency selection */}
      <label htmlFor="cabinCurrency">Currency</label>
      <select
        id="cabinCurrency"
        value={flightCurrency}
        onChange={handleCabinCurrencyChange}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        {/* Add more currency options as needed */}
      </select>

      <div id="passengerDiv">
      <div>
        <button onClick={(e) => handleButtonClick(e, "adults")} className="minus-btn">-</button>
        <input type="text" className="passenger-input" data-type="adults" value={adults} readOnly />
        <button onClick={(e) => handleButtonClick(e, "adults")} className="plus-btn">+</button>
      </div>
      <div>
        <button onClick={(e) => handleButtonClick(e, "children")} className="minus-btn">-</button>
        <input type="text" className="passenger-input" data-type="children" value={children} readOnly />
        <button onClick={(e) => handleButtonClick(e, "children")} className="plus-btn">+</button>
      </div>
      <div>
        <button onClick={(e) => handleButtonClick(e, "infants")} className="minus-btn">-</button>
        <input type="text" className="passenger-input" data-type="infants" value={infants} readOnly />
        <button onClick={(e) => handleButtonClick(e, "infants")} className="plus-btn">+</button>
      </div>
    </div>
      <button className="subtBtn" onClick={handleSubmit}>
          Submit
        </button>
    </>
  );
}

export default Flights;
