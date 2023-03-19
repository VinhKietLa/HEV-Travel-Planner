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

  // Cabin className and currency hooks
  const [flightCabin, setFlightCabin] = useState("Economy");
  const [flightCurrency, setFlightCurrency] = useState("USD");

  // Passenger hooks
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  //Hook for generating cards from Flights API
  const [flightData, setFlightData] = useState([]);

  // Fetch city from Airlabs API.
  useEffect(() => {
    function handleFromInputChange(event) {
      const input = event.target.value;
      // Fetch city suggestions from Airlabs API
      const queryURL = `https://airlabs.co/api/v9/suggest?q=${input}&lang=en&api_key=11f9f1df-8234-4590-bcb9-1c6df28a39c5`;
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

  // Fetch city To suggestions from Airlabs API
  useEffect(() => {
    function handleToInputChange(event) {
      const input = event.target.value;
      // Fetch city suggestions To Airlabs API
      const queryURL = `https://airlabs.co/api/v9/suggest?q=${input}&lang=en&api_key=11f9f1df-8234-4590-bcb9-1c6df28a39c5`;
      fetch(queryURL)
        .then((response) => response.json())
        .then((response) => {
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

  // Departure date eventListener - when the depart field changes it sets the new state
  function handleDepartDateChange(event) {
    setDepartDate(event.target.value);
  }

  // Return date eventListener - when the return date field changes it sets the state
  function handleReturnDateChange(event) {
    setReturnDate(event.target.value);
  }

  // Cabin eventListener - when the cabin className changes it sets the new state or defaults to 'Economy'
  const handleCabinclassNameChange = (event) => {
    setFlightCabin(event.target.value);
  };

  // Currency eventListener - when the currency changes it sets the new state or defaults to 'USD'
  const handleCabinCurrencyChange = (event) => {
    setFlightCurrency(event.target.value);
  };

  // Passenger function - Event listener which listens to which passenger button is clicked and +/- and updates state
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
  };

  // Function creates the reactbootstrap cards, destructing and passing the object from the Flights API instead of using props e.g props.flight.airlineCodes.
  function FlightCard({ flight }) {
    return (
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          {/* Departure */}
          <h4 className="card-title">
            Airline Code: {flight.departureAirport.code}
          </h4>
          <p className="card-text">
            Departure Airport: {flight.departureAirport.name}
          </p>
          {/* Arrival */}
          <h4 className="card-title">
            Airline Code: {flight.arrivalAirport.code}
          </h4>
          <p className="card-text">
            Arrival Airport: {flight.arrivalAirport.name}
          </p>
          <p className="card-text">Depart Date: {flight.outboundDate}</p>
  
          {/* Book now links do not work, maybe workout a way to use the objects to search using a skyscanner URL? */}
          {/* <a href={flight.fares[0][0].handoffUrl} className="btn btn-primary">
              Book Now
            </a> */}
        </div>
      </div>
    );
  }
  
  // This fetches from the Flights API using the variable states from the completed form.
  const getTicketPrice = () => {
    // Fetching data and setting the state
    let queryURL = `https://api.flightapi.io/roundtrip/641210a9f75e113b1880490d/${fromCity}/${apiFromCity}/${departDate}/${returnDate}/${adults}/${children}/${infants}/${flightCabin}/${flightCurrency}`;
    console.log(queryURL);
    fetch(queryURL)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setFlightData(response.search.legs);
      });
  };

  // This handleSubmit executes getTicketPrice to create cards with Flights API information.
  const handleSubmit = (event) => {
    event.preventDefault();
    getTicketPrice(); // Changed from Flights to getTicketPrice
  };

  return (
    <>
      <div>
        <h1 className="heading">Fare Search </h1>
      </div>

      <div className="input-group">
        {/*From input field */}
        <input
          type="text"
          id="cityFromInput"
          list="cityFromSuggestidons"
          placeholder="From"
        />

        {/*Generated options for change of state*/}
        <datalist id="cityFromSuggestions">{fromCity}</datalist>

        {/*To input field */}
        <input
          type="text"
          id="cityToInput"
          list="cityToInput"
          placeholder="To"
        />

        {/*Generated options for change of state*/}
        <datalist id="cityToSuggestions">{apiFromCity}</datalist>

        {/*Departure date*/}
        <label htmlFor="departDateInput">Depart:</label>
        <input
          type="date"
          id="departDateInput"
          onChange={handleDepartDateChange}
        />

        {/*Return date*/}
        <label htmlFor="returnDateInput">Return:</label>
        <input
          type="date"
          id="returnDateInput"
          onChange={handleReturnDateChange}
        />

        {/* Cabin/Class Button */}
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Cabin Class and Currency
        </button>
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                {/*Cabin Class Selection*/}
                <label htmlFor="cabinclassName">Cabin Class:</label>
                <select
                  id="cabinclassName"
                  value={flightCabin}
                  onChange={handleCabinclassNameChange}
                >
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First className</option>
                </select>
              </div>

              {/* Currency Selection */}
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

              {/* Passenger selection */}
              <div id="passengerDiv">
                <div>
                  <span>Adult</span>
                  <button
                    onClick={(e) => handleButtonClick(e, "adults")}
                    className="minus-btn"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="passenger-input"
                    data-type="adults"
                    value={adults}
                    readOnly
                  />
                  <button
                    onClick={(e) => handleButtonClick(e, "adults")}
                    className="plus-btn"
                  >
                    +
                  </button>
                </div>
                <div>
                  <span>Child</span>
                  <button
                    onClick={(e) => handleButtonClick(e, "children")}
                    className="minus-btn"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="passenger-input"
                    data-type="children"
                    value={children}
                    readOnly
                  />
                  <button
                    onClick={(e) => handleButtonClick(e, "children")}
                    className="plus-btn"
                  >
                    +
                  </button>
                </div>
                <div>
                  <span>Infant</span>
                  <button
                    onClick={(e) => handleButtonClick(e, "infants")}
                    className="minus-btn"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="passenger-input"
                    data-type="infants"
                    value={infants}
                    readOnly
                  />
                  <button
                    onClick={(e) => handleButtonClick(e, "infants")}
                    className="plus-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Submit Button */}
        <button className="btn btn-secondary" onClick={handleSubmit}>
          Lets Fly!
        </button>

        {/* Maps over the flightData aray created from the API response and creates a cards for each. */}
        <div id="FlightResults ">
        {flightData.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
      </div>
    </>
  );
}

export default Flights;
