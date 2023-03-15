const submitBtn = document.getElementById("submitBtn");
const userInput = document.getElementById("userInput");

//The users city that they will be visiting//
const lat = 51.5072178;
const lng = -0.1275862;

//Function for taking the users input of the city they're flying from and on submit giving the user the local airports which they can select where to fly from.
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  //Users location
  let location = userInput.value;

  //location based on the users input of city.
  let userDestination = location;

  let queryURL = `https://airlabs.co/api/v9/suggest?q=${userDestination}&api_key=31fb9a8b-2207-4389-b92f-55f24946700e`;
  fetch(queryURL)
    .then((response) => response.json())
    .then((response) => {
      console.log(response.response.airports);

      //This response returns the nearest airports based on the city name
      let startingAirport = response.response.airports;

      //This maps through the response and returns the airport name, icao code and country code, the icao code will be used as part of the flight prices api.
      const airportButtonsHTML = startingAirport
        .map((airport) => {
          return `<button>${airport.name}, ${airport.icao_code}, ${airport.country_code}</button>`;
        })
        .join("");
      // This renders the airports as buttons on the page so the user can select where they would prefer to fly from.
      
      const startingAirportsDiv = document.getElementById("startingAirports");
      startingAirportsDiv.innerHTML = airportButtonsHTML;
    });
});

// a date selector to select the departure date as well as the the return date, option for singie trips

// when a user searches it uses an object...

//user will search for a place

//In order to search for flight prices, I need the IATA codes from the original destination as well as the travel destination

// The long and Lat values can be taken from Google maps when the user selects a destination; however how do I get the users current location?

//Once this is done I can use the airlabs api to get the nearby airports, the user can then select the airport they want to depart from and then the aiport they want to fly to and then we can use flights api to fetch a price?
