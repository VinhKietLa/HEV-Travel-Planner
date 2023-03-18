let queryURL = `https://api.flightapi.io/roundtrip/A641210a9f75e113b1880490d/HAN/SGN/2023-04-10/2023-04-12/1/0/1/Economy/USD`;
  fetch(queryURL)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
    })



    // //- Flights API 
    // Cabin class: economy, business, first, PremiuM_Economy

    // currency: USD,EUR,GBP


    // a date selector to select the departure date as well as the the return date, option for singie trips

    // when a user searches it uses an object...

    //user will search for a place 

    //In order to search for flight prices, I need the IATA codes from the original destination as well as the travel destination

    // The long and Lat values can be taken from Google maps when the user selects a destination; however how do I get the users current location? 

    //Once this is done I can use the airlabs api to get the nearby airports, the user can then select the airport they want to depart from and then the aiport they want to fly to and then we can use flights api to fetch a price?