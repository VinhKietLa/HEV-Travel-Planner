const submitBtn = document.getElementById("submitBtn");
const userInput = document.getElementById("userInput");

//The users city that they will be visiting//
const lat = 51.5072178;
const lng = -0.1275862;

//Function for taking the users input of the city they're flying from and on submit giving the user the local airports which they can select where to fly from.
// submitBtn.addEventListener("click", (event) => {
//   event.preventDefault();

//   //Users location
//   let location = userInput.value;

//   //location based on the users input of city.
//   let userDestination = location;
// // using Airport AutoComplete API Request
//   let queryURL = `https://airlabs.co/api/v9/suggest?q=${userDestination}&api_key=31fb9a8b-2207-4389-b92f-55f24946700e`;
//   fetch(queryURL)
//     .then((response) => response.json())
//     .then((response) => {
//       console.log(response.response.airports);

//       //This response returns the nearest airports based on the city name
//       let startingAirport = response.response.airports;

//       //This maps through the response and returns the airport name, icao code and country code, the icao code will be used as part of the flight prices api.
//       const airportButtonsHTML = startingAirport
//         .map((airport) => {
//           return `<button>${airport.name}, ${airport.icao_code}, ${airport.country_code}</button>`;
//         })
//         .join("");
//       // This renders the airports as buttons on the page so the user can select where they would prefer to fly from.

//       const startingAirportsDiv = document.getElementById("startingAirports");
//       startingAirportsDiv.innerHTML = airportButtonsHTML;
//     });
// });

// This function listens to the generated airport buttons and will return the selected icao code which is needed for the flights api fetch//
function handleAirportButtonClick(event) {
  if (event.target.tagName === "BUTTON") {
    // The user clicked a button
    const button = event.target;
    const airportInfo = button.textContent.split(", ");
    const airportName = airportInfo[0];
    const airportICAO = airportInfo[1];
    const airportCountry = airportInfo[2];

    // Do something with the airport information
    return (airportName, airportICAO, airportCountry);
  }
}

function anotherFunction() {
  // Call the handleAirportButtonClick function and get the airport ICAO code
  const airportICAO = handleAirportButtonClick(event);

  // Use the airport ICAO code in this function
  console.log("The selected airport ICAO code is: " + airportICAO);
}

const startingAirportsDiv = document.getElementById("startingAirports");
startingAirportsDiv.addEventListener("click", handleAirportButtonClick);



const cityFromInput = document.getElementById("cityFromInput");
const cityFromSuggestions = document.getElementById("cityFromSuggestions");
let selectedCity = null; // Initialize selectedCity variable

cityFromInput.addEventListener("input", (event) => {
  const input = event.target.value;

  // Fetch city suggestions from an API
  const queryURL = `https://airlabs.co/api/v9/suggest?q=${input}&api_key=31fb9a8b-2207-4389-b92f-55f24946700e`;
  fetch(queryURL)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      // Clear existing suggestions
      cityFromSuggestions.innerHTML = "";

      // Add new suggestions to the datalist element
      const cities = response.response.cities;
      cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city.name;
        option.textContent = city.name;
        cityFromSuggestions.appendChild(option);
      });
    });
});

cityFromSuggestions.addEventListener("change", () => {
  selectedCity = cityFromSuggestions.value;
  console.log('Selected city:', selectedCity);

  // Use selected value for the API?
});



const cityToInput = document.getElementById("cityToInput");
const cityToSuggestions = document.getElementById("cityToSuggestions");

cityToInput.addEventListener("input", (event) => {
  const input = event.target.value;

  // Fetch city suggestions from an API
  const queryURL = `https://airlabs.co/api/v9/suggest?q=${input}&api_key=31fb9a8b-2207-4389-b92f-55f24946700e`;
  fetch(queryURL)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      // Clear existing suggestions
      cityToSuggestions.innerHTML = "";

      // Add new suggestions to the datalist element
      const cities = response.response.cities;
      cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city.name;
        option.textContent = city.name;
        cityToSuggestions.appendChild(option);
      });
    });
});


// Do another fetch using the users holiday destination? We can get these values either from when they click on the map or.....we can ask them to reconfirm....?

//we also need dates for when they go and when they come back-----

//FLIGHTS API ACCEPTED PARAMETERS//

// departure-airport-iata []
// arrival-airport-iata []
// departure-date [] e.g 2023-04-1
// return-date [] e.g 2023-04-10
// number-of-adults[] e.g 1 
// number-of-children [] e.g 0
// number-of-infants[] e.g 0 
// cabin-class [] - can be either "Economy", "Business" or "First" or "Premium_Econoy" e.g Economy
// currency[] - can USD, EUR, GBP e.g USD





// a date selector to select the departure date as well as the the return date, option for singie trips

// when a user searches it uses an object...

//user will search for a place

//In order to search for flight prices, I need the IATA codes from the original destination as well as the travel destination

// The long and Lat values can be taken from Google maps when the user selects a destination; however how do I get the users current location?

//Once this is done I can use the airlabs api to get the nearby airports, the user can then select the airport they want to depart from and then the aiport they want to fly to and then we can use flights api to fetch a price?
