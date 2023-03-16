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
//   let queryURL = `https://airlabs.co/api/v9/suggest?q=${userDestination}&api_key=9dc705cb-3e98-479d-9e62-a38e26bc2f97`;
//   fetch(queryURL)
//     .then((response) => response.json())
//     .then((response) => {
//       console.log(response);
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
// function handleAirportButtonClick(event) {
//   if (event.target.tagName === "BUTTON") {
//     // The user clicked a button
//     const button = event.target;
//     const airportInfo = button.textContent.split(", ");
//     const airportName = airportInfo[0];
//     const airportICAO = airportInfo[1];
//     const airportCountry = airportInfo[2];

//     // Do something with the airport information
//     return (airportName, airportICAO, airportCountry);
//   }
// }

// function anotherFunction() {
//   // Call the handleAirportButtonClick function and get the airport ICAO code
//   const airportICAO = handleAirportButtonClick(event);

//   // Use the airport ICAO code in this function
//   console.log("The selected airport ICAO code is: " + airportICAO);
// }

// const startingAirportsDiv = document.getElementById("startingAirports");
// startingAirportsDiv.addEventListener("click", handleAirportButtonClick);


const cityFromInput = document.getElementById("cityFromInput");
const cityFromSuggestions = document.getElementById("cityFromSuggestions");

let fromCity = null; // To be used later in the flights API as the departure-airport-iata
let apiFromCity = null;

cityFromInput.addEventListener("input", (event) => {
  let input = event.target.value;

  // Fetch city suggestions from an API
  let queryURL = `https://airlabs.co/api/v9/suggest?q=${input}&api_key=9dc705cb-3e98-479d-9e62-a38e26bc2f97`;
  fetch(queryURL)
    .then((response) => response.json())
    .then((response) => {
      let cities = response.response.airports;

      console.log(response.response.airports); // Check the structure of the response object

      // // Clear existing suggestions
      cityFromSuggestions.innerHTML = "";
      console.log(input);
      // Add new suggestions to the datalist element
      // const cities = response.response.airports;
      cities.forEach((city) => {
        const option = document.createElement("option");
        option.textContent = `${city.name} (${city.iata_code})`;
        option.value = `${city.name} ${city.iata_code}`;     

        option.addEventListener("click", (event) => {
          const selectedOption = event.target;
          console.log(selectedOption);
          const selectedCity = cities.find(city => `${city.name} ${city.iata_code}` === selectedOption.value);
          console.log(selectedCity);
          fromCity = selectedOption.value;
          cityFromInput.value = fromCity;
          apiFromCity = selectedCity.iata_code;
          console.log(selectedCity.icao_code); // Log the icao_code property of the selected city
          departureAirportIata = apiFromCity;
        });
        cityFromSuggestions.appendChild(option);
      });
    });
});



const cityToInput = document.getElementById("cityToInput");
const cityToSuggestions = document.getElementById("cityToSuggestions");

let toCity = null; // To be used later in the flights API as the departure-airport-iata
let apiToCity = null;
//This is an event listener for the TO INPUT (user select destination airport)
cityToInput.addEventListener("input", (event) => {
  //This sets the variable input to the value that is entered in the input field
  let input = event.target.value;

  // This Fetch city suggestions from a AirLabs API using the user input
  let queryURL = `https://airlabs.co/api/v9/suggest?q=${input}&api_key=9dc705cb-3e98-479d-9e62-a38e26bc2f97`;
  fetch(queryURL)
    .then((response) => response.json())
    .then((response) => {
      //This returns an array of nearby airports using the NearsBy API from AirLabs.
      let cities = response.response.airports;

      // console.log(response.response.airports); // Check the structure of the response object

      // // Clear existing suggestions
      cityToSuggestions.innerHTML = "";
      // Add new suggestions to the datalist element
      // const cities = response.response.airports;
      cities.forEach((city) => {
        let option = document.createElement("option");
        option.textContent = `${city.name} (${city.iata_code})`;
        option.value = `${city.name} ${city.iata_code}`;     
        
        option.addEventListener("click", (event) => {
          const selectedOption = event.target;
          console.log(selectedOption);
          const selectedCity = cities.find(city => `${city.name} ${city.iata_code}` === selectedOption.value);
          console.log(selectedCity);
          toCity = selectedOption.value;
          cityToInput.value = toCity;
          apiToCity = selectedCity.iata_code;
          console.log(selectedCity.iata_code); // Log the icao_code property of the selected city

          arrivalAirportIata = apiFromCity;
        });
        
        cityToSuggestions.appendChild(option);
      });
    });
});
//FROM AND TO DEPARTURE DATE SELECTIONS
const departDateInput = document.getElementById("departDateInput");
const returnDateInput = document.getElementById("returnDateInput");

let departDate = null;
let returnDate = null;

departDateInput.addEventListener("input", (event) => {
  departDate = event.target.value;
  departureDate = departDate;
});

returnDateInput.addEventListener("input", (event) => {
  returnDate = event.target.value;
  return_Date = returnDate;

});


//PASSENGER BUTTONS//

//object with passenger keys
const passengerValues = {
  adults: 0,
  children: 0,
  infants: 0
};

const passengerDiv = document.querySelector("#passengerDiv");

passengerDiv.addEventListener("click", (event) => {
  event.preventDefault();

  //If no button is found, the function returns early
  const btn = event.target.closest("button");
  if (!btn) return;

  //If no input is found, the function returns early
  const input = btn.parentNode.querySelector(".passenger-input");
  if (!input) return;

  //parseInt to turn the input field string into an integer.
  let value = parseInt(input.value);

  //Increment or decrement based on the user selection and adds the sum to the value variable
  if (btn.classList.contains("plus-btn")) {
    value++;
  } else if (btn.classList.contains("minus-btn") && value > 0) {
    value--;
  }
  //This updates the input field with the new value based on user increment or decrement.
  input.value = value;
  // this accesses the data-type of the selected input field
  const passengerType = input.dataset.type;
  console.log(passengerType);
  //This access the passengerValue and updates the key with the relevant value.
  passengerValues[passengerType] = value;
  console.log(passengerValues); // Log the updated passengerValues object
});


const submitFormButton = document.querySelector('.subtBtn');
submitFormButton.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(passengerValues);
  const { adults, children, infants } = passengerValues;
  numberOfAdults = adults;
  numberOfChildren = children;
  numberofInfants = infants;
  // Use passengerValues object in API call or other logic
});

//CABIN CLASS SELECTION
const cabinClassSelect = document.getElementById("cabinClass");

let selectedCabinClass = cabinClassSelect.value;
console.log(selectedCabinClass);
if(selectedCabinClass === undefined) {
   selectedCabinClass = 'Economy';
}

cabinClassSelect.addEventListener("change", (event) => {

  selectedCabinClass = event.target.value;
  console.log(selectedCabinClass);
  flightCabin = selectedCabinClass;
});


const cabinCurrencySelect = document.getElementById("cabinCurrency");

let selectedCabinCurrency = cabinCurrencySelect.value;
if(selectedCabinCurrency === null) {
   selectedCabinClass = 'USD';
   flightCabin = selectedCabinClass;
}

cabinCurrencySelect.addEventListener("change", (event) => {
   selectedCabinCurrency = event.target.value;
  console.log(selectedCabinCurrency);
  flightCurrency = selectedCabinCurrency;
});

//FLIGHT API PRICE - GET FLIGHT PRICE//

let departureAirportIata;
console.log(departureAirportIata);

let arrivalAirportIata;
console.log(arrivalAirportIata);

let departureDate;;
console.log(departureDate);

let return_Date;
console.log(return_Date);

const { adults, children, infants } = passengerValues;

let numberOfAdults;
let numberOfChildren;
let numberofInfants;
console.log(numberOfAdults);
console.log(numberOfChildren);
console.log(numberofInfants);

let flightCabin;
console.log(flightCabin);

let flightCurrency;
console.log(flightCurrency);


// let queryURL = `https://api.flightapi.io/roundtrip/A641210a9f75e113b1880490d/${departureAirportIata}/${arrivalAirportIata}/${departDate}/${return_Date}/${numberOfAdults}/${numberOfChildren}/${numberofInfants}/${flightCabin}/${flightCurrency}`;
//   fetch(queryURL)
//     .then((response) => response.json())
//     .then((response) => {
//       console.log(response)
//     })


              //P-S-E-U-D-O--T-I-M-E//
//return all collected variables from the form and then input this into Flight API to fetch pricing information

// I just need to return selectedCity.icao_code in both from and to functions and then use this in the next fetch
// next task is to return the users date inputs for depart and return


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
