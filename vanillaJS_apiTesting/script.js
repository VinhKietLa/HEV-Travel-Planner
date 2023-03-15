let optionsBtn = document.getElementById("checkMyOptions");
let chosenKindDiv = document.getElementById("chosen-kind");
let catBtns = document.getElementById("category-buttons");
// below user input has to be lat and lon
// get them to pick a location on google maps from google api and get lat and lon values.
// open trip map api does not work with city names only as it is not specific enough
// Specify the single latitude and longitude value
const latitude = 35.7865;
const longitude = -9.4194;
let lonMin, lonMax;

// Use the OpenCage Geocoder API to get the location information for the latitude and longitude
const apiKey = "d4fa4867fc804ba4a8af0e7e9346c89c";
const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}%2C${longitude}&pretty=1`;
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const location = data.results[0].formatted;

    // Use the OpenCage Geocoder API to get the latitude and longitude for the location with a slight variation
    const url2 = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${location}&pretty=1`;
    fetch(url2)
      .then((response2) => response2.json())
      .then((data2) => {
        const lat2 = data2.results[0].geometry.lat;
        const lon2 = data2.results[0].geometry.lng;

        // Calculate the latitude and longitude range for the original location
        latMin = Math.min(latitude, lat2);
        latMax = Math.max(latitude, lat2);
        lonMin = Math.min(longitude, lon2);
        lonMax = Math.max(longitude, lon2);

        console.log(`Latitude Range: ${latMin} to ${latMax}`);
        console.log(`Longitude Range: ${lonMin} to ${lonMax}`);

        // open trip map return
        // have to continue playing with endpoints to decide whihc options to give to user
        // do we want to specify the sources or give all 4? this increases conditionals but again makes the app more cool
        // default response is 50 results, we can limit it this depending on our need

        const url3 = ` https://api.opentripmap.com/0.1/en/places/bbox?lon_min=${lonMin}&lon_max=${lonMax}&lat_min=${latMin}&lat_max=${latMax}&format=json&limit=200&apikey=5ae2e3f221c38a28845f05b6165ca5f078a6cd7e01751064ebf17758`;

        fetch(url3)
          .then((response3) => response3.json())
          .then((data3) => {
            console.log("last", data3);
            // const kindsSet = [];

            // // loop through json and get to kinds
            // for (let i = 0; i < data3.length; i++) {
            //   // console.log(data3[i].kinds);
            //   const kinds = data3[i].kinds.split(",");
            //   console.log(kinds);
            //   // if(kinds.includes('br'))

            //   // else if
            //   // else if
            //   // kindsSet.push(kinds);
            // }
            // console.log(kindsSet);
          });

        // by default all sources are being returned
      });
  });

// write a function to group by kind and render

// subsections: give them all? or perhaps define on separate components of the react app

// when the user clicks on a button give them multiple buttons with 4 main kinds: big groups - accommodations, adult, amusements, interesting_places, sport, tourist_facilitites
// add event listener on the button
// get kids container from html

const kindsDiv = document.getElementById("kinds-container");

optionsBtn.addEventListener("click", function () {
  const kinds = [
    "accomodations",
    "adult",
    "amusements",
    "interesting_places",
    "sport",
    "tourist_facilities",
  ];

  // loop through kinds and render buttons with each category

  for (let i = 0; i < kinds.length; i++) {
    const kind = kinds[i];
    let button = document.createElement("button");
    button.textContent = kind;
    button.addEventListener("click", function (e) {
      // then on each button being pressed, depending on the button, fetch the required kind subcategories
      let kindValue = e.target.textContent;

      // api construct including kinds
      const kindsAPI = `https://api.opentripmap.com/0.1/en/places/bbox?lon_min=${lonMin}&lon_max=${lonMax}&lat_min=${latMin}&lat_max=${latMax}&kinds=${kindValue}&format=json&limit=200&apikey=5ae2e3f221c38a28845f05b6165ca5f078a6cd7e01751064ebf17758`;

      fetch(kindsAPI)
        .then((response) => response.json())
        .then((chosenKind) => {
          // loop through retrieved json and get to kinds array of each place
          for (let i = 0; i < chosenKind.length; i++) {
            const kinds = chosenKind[i].kinds.split(",");
            console.log(kinds);

            // for (let j = 0; j < kinds.length; j++) {
            //   const subkind = kinds[j];
            //   console.log(subkind);

            //   // map through subkinds and create buttons for each
            //   const buttonsKinds = kinds.map((subkind) => {
            //     return `<button>${subkind}</button>`;
            //   });
            //   // join the array of button HTML strings into a single string and set it as the innerHTML of subkindDiv
            //   catBtns.innerHTML = buttonsKinds.join("");
            // }

            // // add event listener on subkind and redner cards

            // subkind.addEventListener("click", function () {});
          }

          // if subcategories, render button with the text of each
          // check if name already rendered do not re-render the button with the same category

          // extract name and rating and render on the page
          // map through all the places
          const cardsHTML = chosenKind.map((place) => {
            const name = place.name;
            const rating = place.rate;
            // some places have no name and no rating so exclude them
            if (place.name && place.rate) {
              return `<div class="card" style="width: 18rem;">
              <img src="..." class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Name: ${name}</h5>
                <p class="card-text">Rating: ${rating}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>`;
            }
          });

          // join the array of HTML strings into a single string and set it as the innerHTML of chosenKindDiv
          chosenKindDiv.innerHTML = cardsHTML.join("");
        });
    });
    kindsDiv.appendChild(button);
  }
});
