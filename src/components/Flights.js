import React from "react";

function Flights() {
  return (
    <>
      <div>
        <h1>Ready to Fly?</h1>
      </div>
      <h2>What city are you flying from?</h2>
      <div>
        <form className="autocomplete">
          <label htmlFor="cityFromInput">From</label>
          <input type="text" id="cityFromInput" list="cityFromSuggestidons" />
          <datalist id="cityFromSuggestions" />
          <label htmlFor="cityToInput">To</label>
          <input type="text" id="cityToInput" list="cityToSuggestidons" />
          <datalist id="cityToSuggestions" />
          <label htmlFor="dateInput">Depart</label>
          <input type="date" id="departDateInput" name="dateInput" />
          <label htmlFor="dateInput">Return</label>
          <input type="date" id="returnDateInput" name="dateInput" />
          <label htmlFor="dateInput">Travellers &amp; Cabin Class</label>
          <div id="cabinClassDiv">
            <select id="cabinClass" name="cabinClass">
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First</option>
            </select>
            <select id="cabinCurrency" name="cabinCurrency">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div id="passengerDiv">
            <div>
              <button className="minus-btn">−</button>
              <span> Adults:</span>
              <input
                type="number"
                defaultValue={0}
                className="passenger-input"
                data-type="adults"
              />
              <button className="plus-btn">+</button>
            </div>
            <div>
              <button className="minus-btn">−</button>
              <span> Children:</span>
              <input
                type="number"
                defaultValue={0}
                className="passenger-input"
                data-type="children"
              />
              <button className="plus-btn">+</button>
            </div>
            <div>
              <button className="minus-btn">−</button>
              <span> Infants:</span>
              <input
                type="number"
                defaultValue={0}
                className="passenger-input"
                data-type="infants"
              />
              <button className="plus-btn">+</button>
            </div>
          </div>
          <button className="subtBtn">Search</button>
        </form>
      </div>
    </>
  );
}

export default Flights;

