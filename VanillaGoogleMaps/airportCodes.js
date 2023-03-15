let userinput = document.getElementById('userInput');


let userDestination = 'Tokyo';

let queryURL = `https://airlabs.co/api/v9/suggest?q=${userDestination}&api_key=31fb9a8b-2207-4389-b92f-55f24946700e`;
  fetch(queryURL)
    .then((response) => response.json())
    .then((response) => {
      console.log(response.response.airports)
    })





    // a date selector to select the departure date as well as the the return date, option for singie trips

    // when a user searches it uses an object...

    //user will search for a place 

    //In order to search for flight prices, I need the IATA codes from the original destination as well as the travel destination

    // The long and Lat values can be taken from Google maps when the user selects a destination; however how do I get the users current location? 

    //Once this is done I can use the airlabs api to get the nearby airports, the user can then select the airport they want to depart from and then the aiport they want to fly to and then we can use flights api to fetch a price?