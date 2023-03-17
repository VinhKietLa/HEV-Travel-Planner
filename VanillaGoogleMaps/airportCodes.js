const submitBtn = document.getElementById("submitBtn");
const userInput = document.getElementById("userInput");

let departureAirportIata;
console.log(departureAirportIata);

let arrivalAirportIata;
console.log(arrivalAirportIata);

let departureDate;
console.log(departureDate);

let return_Date;
console.log(return_Date);

// const { adults, children, infants } = passengerValues;

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
          const selectedCity = cities.find(
            (city) => `${city.name} ${city.iata_code}` === selectedOption.value
          );
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
          const selectedCity = cities.find(
            (city) => `${city.name} ${city.iata_code}` === selectedOption.value
          );
          console.log(selectedCity);
          toCity = selectedOption.value;
          cityToInput.value = toCity;
          apiToCity = selectedCity.iata_code;
          console.log(selectedCity.iata_code); // Log the icao_code property of the selected city

          arrivalAirportIata = apiToCity;
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
  infants: 0,
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
  // console.log(passengerType);
  //This access the passengerValue and updates the key with the relevant value.
  passengerValues[passengerType] = value;
  // console.log(passengerValues); // Log the updated passengerValues object
});

const submitFormButton = document.querySelector(".subtBtn");
submitFormButton.addEventListener("click", (event) => {
  event.preventDefault();
  const { adults, children, infants } = passengerValues;
  numberOfAdults = adults;
  numberOfChildren = children;
  numberofInfants = infants;
  // Use passengerValues object in API call or other logic

  getTicketPrice();
});

//CABIN CLASS SELECTION
const cabinClassSelect = document.getElementById("cabinClass");

let selectedCabinClass = cabinClassSelect.value;
flightCabin = selectedCabinClass;

console.log(selectedCabinClass);
if (selectedCabinClass === undefined) {
  selectedCabinClass = "Economy";
  flightCabin = selectedCabinClass;
}

cabinClassSelect.addEventListener("change", (event) => {
  selectedCabinClass = event.target.value;
  console.log(selectedCabinClass);
  flightCabin = selectedCabinClass;
});

const cabinCurrencySelect = document.getElementById("cabinCurrency");

let selectedCabinCurrency = cabinCurrencySelect.value;
flightCurrency = selectedCabinCurrency;

console.log(selectedCabinCurrency);

if (selectedCabinCurrency === null) {
  selectedCabinClass = "USD";
  flightCurrency = selectedCabinCurrency;
}

cabinCurrencySelect.addEventListener("change", (event) => {
  selectedCabinCurrency = event.target.value;
  console.log(selectedCabinCurrency);
  flightCurrency = selectedCabinCurrency;
});

//FLIGHT API PRICE - GET FLIGHT PRICE//

// let departureAirportIata;
// console.log(departureAirportIata);

// let arrivalAirportIata;
// console.log(arrivalAirportIata);

// let departureDate;
// console.log(departureDate);

// let return_Date;
// console.log(return_Date);

// const { adults, children, infants } = passengerValues;

// let numberOfAdults;
// let numberOfChildren;
// let numberofInfants;
// console.log(numberOfAdults);
// console.log(numberOfChildren);
// console.log(numberofInfants);

// let flightCabin;
// console.log(flightCabin);

// let flightCurrency;
// console.log(flightCurrency);
const { adults, children, infants } = passengerValues;

function getTicketPrice() {
  console.log(departureAirportIata);

  console.log(arrivalAirportIata);

  console.log(departureDate);

  console.log(return_Date);

  console.log(numberOfAdults);
  console.log(numberOfChildren);
  console.log(numberofInfants);
  console.log(flightCabin);

  console.log(flightCurrency);

  console.log("test");
  let queryURL = `https://api.flightapi.io/roundtrip/641210a9f75e113b1880490d/${departureAirportIata}/${arrivalAirportIata}/${departDate}/${return_Date}/${numberOfAdults}/${numberOfChildren}/${numberofInfants}/${flightCabin}/${flightCurrency}`;
  fetch(queryURL)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });
}

//uncomment this later
//   const flights = [
//     {
//         "paymentFees": [
//             {
//                 "paymentMethodId": 15,
//                 "currencyCode": "USD",
//                 "amount": 0,
//                 "amountUsd": 0
//             },
//             {
//                 "paymentMethodId": 10,
//                 "currencyCode": "USD",
//                 "amount": 0,
//                 "amountUsd": 0
//             },
//             {
//                 "paymentMethodId": 3,
//                 "currencyCode": "USD",
//                 "amount": 0,
//                 "amountUsd": 0
//             }
//         ],
//         "id": "374530d2d7b07676msr:mytrip.com.us:727b142aebce050",
//         "price": {
//             "totalAmount": 1858,
//             "totalAmountUsd": 1857.99,
//             "amount": 1858,
//             "amountUsd": 1857.99,
//             "originalAmount": 1857.99,
//             "originalAmountUsd": 1857.99,
//             "amountPerAdult": 1857.99,
//             "amountPerChild": 0,
//             "amountPerInfant": 0,
//             "taxAmount": 0,
//             "taxAmountUsd": 0,
//             "totalTaxAmount": 0,
//             "totalTaxAmountUsd": 0,
//             "currencyCode": "USD",
//             "paymentFeeAmountUsd": 0,
//             "bookingFee": 0,
//             "bookingFeeUsd": 0,
//             "totalBookingFee": 0,
//             "totalBookingFeeUsd": 0
//         },
//         "providerCode": "mytrip.com.us",
//         "handoffUrl": "https://handoff.wego.com/flights/continue?currency=USD&url_locale=en&site_code=US&device_type=desktop&app_type=WEB_APP&domain=www.wego.com&fare_id=374530d2d7b07676msr:mytrip.com.us:727b142aebce050&route=HND-LHR&search_id=374530d2d7b07676msr&trip_id=HND:LHR:2023-03-20:LHR:HND:2023-03-22&pwa=false&api_version=2&integration_code=mytrip.com&region=ap-southeast-1&placement_type=metasearch",
//         "ecpc": 0.661797,
//         "remainingSeatsCount": 0,
//         "conditionIds": [],
//         "legConditionIds": [],
//         "refundable": false,
//         "exchangeable": false,
//         "tags": [],
//         "tripId": "374530d2d7b07676msr:OZ1035~20-OZ521~21=CX252~22-CX590~23-7G26~23"
//     },{
//       "paymentFees": [
//           {
//               "paymentMethodId": 15,
//               "currencyCode": "USD",
//               "amount": 0,
//               "amountUsd": 0
//           },
//           {
//               "paymentMethodId": 10,
//               "currencyCode": "USD",
//               "amount": 0,
//               "amountUsd": 0
//           },
//           {
//               "paymentMethodId": 3,
//               "currencyCode": "USD",
//               "amount": 0,
//               "amountUsd": 0
//           }
//       ],
//       "id": "374530d2d7b07676msr:flightnetwork.com.us:f785822f55d9d059",
//       "price": {
//           "totalAmount": 1858,
//           "totalAmountUsd": 1857.87,
//           "amount": 1858,
//           "amountUsd": 1857.87,
//           "originalAmount": 1857.87,
//           "originalAmountUsd": 1857.87,
//           "amountPerAdult": 1857.87,
//           "amountPerChild": 0,
//           "amountPerInfant": 0,
//           "taxAmount": 0,
//           "taxAmountUsd": 0,
//           "totalTaxAmount": 0,
//           "totalTaxAmountUsd": 0,
//           "currencyCode": "USD",
//           "paymentFeeAmountUsd": 0,
//           "bookingFee": 0,
//           "bookingFeeUsd": 0,
//           "totalBookingFee": 0,
//           "totalBookingFeeUsd": 0
//       },
//       "providerCode": "flightnetwork.com.us",
//       "handoffUrl": "https://handoff.wego.com/flights/continue?currency=USD&url_locale=en&site_code=US&device_type=desktop&app_type=WEB_APP&domain=www.wego.com&fare_id=374530d2d7b07676msr:flightnetwork.com.us:f785822f55d9d059&route=HND-LHR&search_id=374530d2d7b07676msr&trip_id=HND:LHR:2023-03-20:LHR:HND:2023-03-22&pwa=false&api_version=2&integration_code=flightnetwork.com&region=ap-southeast-1&placement_type=metasearch",
//       "ecpc": 0.583422,
//       "remainingSeatsCount": 0,
//       "conditionIds": [],
//       "legConditionIds": [],
//       "refundable": false,
//       "exchangeable": false,
//       "tags": [],
//       "tripId": "374530d2d7b07676msr:OZ1035~20-OZ521~21=CX252~22-CX590~23-7G26~23"
//   },
//   {
//     "paymentFees": [
//         {
//             "paymentMethodId": 15,
//             "currencyCode": "USD",
//             "amount": 0,
//             "amountUsd": 0
//         },
//         {
//             "paymentMethodId": 10,
//             "currencyCode": "USD",
//             "amount": 0,
//             "amountUsd": 0
//         },
//         {
//             "paymentMethodId": 3,
//             "currencyCode": "USD",
//             "amount": 0,
//             "amountUsd": 0
//         }
//     ],
//     "id": "374530d2d7b07676msr:mytrip.com.us:e6eab885970c7799",
//     "price": {
//         "totalAmount": 1893,
//         "totalAmountUsd": 1893.28,
//         "amount": 1893,
//         "amountUsd": 1893.28,
//         "originalAmount": 1893.28,
//         "originalAmountUsd": 1893.28,
//         "amountPerAdult": 1893.28,
//         "amountPerChild": 0,
//         "amountPerInfant": 0,
//         "taxAmount": 0,
//         "taxAmountUsd": 0,
//         "totalTaxAmount": 0,
//         "totalTaxAmountUsd": 0,
//         "currencyCode": "USD",
//         "paymentFeeAmountUsd": 0,
//         "bookingFee": 0,
//         "bookingFeeUsd": 0,
//         "totalBookingFee": 0,
//         "totalBookingFeeUsd": 0
//     },
//     "providerCode": "mytrip.com.us",
//     "handoffUrl": "https://handoff.wego.com/flights/continue?currency=USD&url_locale=en&site_code=US&device_type=desktop&app_type=WEB_APP&domain=www.wego.com&fare_id=374530d2d7b07676msr:mytrip.com.us:e6eab885970c7799&route=HND-LHR&search_id=374530d2d7b07676msr&trip_id=HND:LHR:2023-03-20:LHR:HND:2023-03-22&pwa=false&api_version=2&integration_code=mytrip.com&region=ap-southeast-1&placement_type=metasearch",
//     "ecpc": 0.661797,
//     "remainingSeatsCount": 0,
//     "conditionIds": [],
//     "legConditionIds": [],
//     "refundable": false,
//     "exchangeable": false,
//     "tags": [],
//     "tripId": "374530d2d7b07676msr:OZ1035~20-OZ521~21=CX252~22-CX590~23-JL134~23"
// },
//     // Additional flights objects...
// ];

// const flightInfo = flights.map(flight => {
//     return {
//         price: flight.price,
//         providerCode: flight.providerCode,
//         handoffUrl: flight.handoffUrl,
//     };
// });

const inputData = {

  "legs": [
    {
      "id": "HND-LHR:SQ635~20:SQ308~21:0",
      "departureTime": "22:55",
      "arrivalTime": "15:20",
      "duration": "25h 25m",
      "departureAirportCode": "HND",
      "arrivalAirportCode": "LHR",
      "airlineCodes": [
          "SQ"
      ],
      "stopoverAirportCodes": [
          "SIN"
      ],
      "allianceCodes": [
          "star_alliance"
      ],
      "stopoversCount": 1,
      "departureTimeMinutes": 1375,
      "arrivalTimeMinutes": 920,
      "departureDateTime": "2023-03-20T22:55:00.000+09:00",
      "arrivalDateTime": "2023-03-21T15:20:00.000Z",
      "stopoverDurationMinutes": 225,
      "durationMinutes": 1525,
      "overnight": true,
      "stopoverDuration": "03h 45m",
      "durationDays": 1,
      "longStopover": false,
      "segments": [
          {
              "durationMinutes": 440,
              "stopoverDurationMinutes": 225,
              "departureAirportCode": "HND",
              "arrivalAirportCode": "SIN",
              "airlineCode": "SQ",
              "cabin": "economy",
              "designatorCode": "SQ635",
              "departureDateTime": "2023-03-20T22:55:00.000+09:00",
              "arrivalDateTime": "2023-03-21T05:15:00.000+08:00"
          },
          {
              "durationMinutes": 860,
              "stopoverDurationMinutes": 0,
              "departureAirportCode": "SIN",
              "arrivalAirportCode": "LHR",
              "airlineCode": "SQ",
              "cabin": "economy",
              "designatorCode": "SQ308",
              "departureDateTime": "2023-03-21T09:00:00.000+08:00",
              "arrivalDateTime": "2023-03-21T15:20:00.000Z"
          }
      ],
      "operatingAirlineCodes": [],
      "stopoverCode": "ONE_STOP",
      "shortStopover": false,
      "earlyDeparture": false,
      "lateArrival": false,
      "newAircraft": false,
      "oldAircraft": true,
      "highlyRatedCarrier": false,
      "score": 814.33
  },
    {
      id: "HND-LHR:AF271~20:AF1780~21:0",
      departureTime: "23:30",
      arrivalTime: "13:45",
      duration: "23h 15m",
      departureAirportCode: "HND",
      arrivalAirportCode: "LHR",
      airlineCodes: ["AF"],
      stopoverAirportCodes: ["CDG"],
      allianceCodes: ["sky_team"],
      stopoversCount: 1,
      departureTimeMinutes: 1410,
      arrivalTimeMinutes: 825,
      departureDateTime: "2023-03-20T23:30:00.000+09:00",
      arrivalDateTime: "2023-03-21T13:45:00.000Z",
      stopoverDurationMinutes: 420,
      durationMinutes: 1395,
      overnight: true,
      stopoverDuration: "07h",
      durationDays: 1,
      longStopover: true,
      segments: [
        {
          durationMinutes: 885,
          stopoverDurationMinutes: 420,
          departureAirportCode: "HND",
          arrivalAirportCode: "CDG",
          airlineCode: "AF",
          cabin: "economy",
          designatorCode: "AF271",
          departureDateTime: "2023-03-20T23:30:00.000+09:00",
          arrivalDateTime: "2023-03-21T06:15:00.000+01:00",
        },
        {
          durationMinutes: 90,
          stopoverDurationMinutes: 0,
          departureAirportCode: "CDG",
          arrivalAirportCode: "LHR",
          airlineCode: "AF",
          cabin: "economy",
          designatorCode: "AF1780",
          departureDateTime: "2023-03-21T13:15:00.000+01:00",
          arrivalDateTime: "2023-03-21T13:45:00.000Z",
        },
      ],
      operatingAirlineCodes: [],
      stopoverCode: "ONE_STOP",
      shortStopover: false,
      earlyDeparture: false,
      lateArrival: false,
      newAircraft: false,
      oldAircraft: true,
      highlyRatedCarrier: false,
      score: 793,
    },
  ],
};




// Generate an array of HTML strings representing the bootstrap cards
const flightsAPI = inputData.legs.map(flight => {
  return `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h3 class="card-title">Airline Code: ${flight.airlineCodes}</h3>
        <p class="card-text">Arrival Airport: ${flight.arrivalAirportCode}</p>
        <p class="card-text">Arrival Date + Time: ${flight.arrivalDateTime}</p>
        <p class="card-text"Arrival Time: ${flight.arrivalTime}</p>

        <p class="card-text">Departure Airport: ${flight.departureAirportCode}</p>
        <p class="card-text">Departure Date Time: ${flight.departureDateTime}</p>
        <p class="card-text">Arrival Time: ${flight.arrivalTime}</p>
        <p class="card-text">Flight Duration: ${flight.duration}</p>

        <p class="card-text">Stopover Count: ${flight.stopoversCount}</p>



        <a href="${flight.handoffUrl}" class="btn btn-primary">Book Now</a>
      </div>
    </div>`;
});

// Insert the flight cards into the HTML document
const results = document.getElementById('FlightResults');
results.innerHTML = flightsAPI.join('');

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
