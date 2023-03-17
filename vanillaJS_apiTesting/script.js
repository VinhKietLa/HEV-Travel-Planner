// DOM elements
let userLat = document.getElementById("lat");
let userLng = document.getElementById("lng");
let result = document.getElementById("result");
let optionsBtn = document.getElementById("checkMyOptions");
let chosenKindDiv = document.getElementById("chosen-kind");
let catBtns = document.getElementById("category-buttons");
const kindsDiv = document.getElementById("kinds-container");
// global variables
let map;

// global variables for lat and lon values from user input
let latitude, longitude;
// global variables for categories fetch
let lonMin, lonMax;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.507351, lng: -0.127758 },
    zoom: 8,
  });

  const marker = new google.maps.Marker({
    map: map,
    visible: false,
  });

  // Use the geocoding API to look up the nearest city
  google.maps.event.addListener(map, "click", function (event) {
    latitude = event.latLng.lat();
    longitude = event.latLng.lng();
    // Specify the single latitude and longitude value
    console.log(latitude, "latitude");
    console.log(longitude, "longitude");

    // Use the geocoding API to look up the nearest city
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      function (results, status) {
        if (status === "OK" && results.length > 0) {
          // Find the nearest city
          const cityResult = results.find((result) =>
            result.types.includes("locality")
          );

          if (cityResult) {
            // Get the city location and address
            const cityLocation = cityResult.geometry.location;
            const cityAddress = cityResult.formatted_address;
            console.log("Nearest city:", cityAddress);

            // display the nearest city on the webpage
            result.textContent = cityAddress;

            // Set the position of the marker to the nearest city location
            marker.setPosition(cityLocation);
            marker.setVisible(true);
          } else {
            console.error("No city found");

            // Set the marker to the center of the map if no city is found
            marker.setPosition(map.getCenter());
            marker.setVisible(true);

            userLat.nextSibling?.remove();
          }
        } else {
          console.error("Geocode failed:", status);

          // Set the marker to the center of the map if geocoding fails
          marker.setPosition(map.getCenter());
          marker.setVisible(true);

          userLat.nextSibling?.remove();
        }
      }
    );

    // Use the OpenCage Geocoder API to get the location information for the latitude and longitude
    const apiKey = "d4fa4867fc804ba4a8af0e7e9346c89c";
    // google places api key
    // const photosApiKey = "AIzaSyCY88CmnQtk_uHolo6N3JIOWHMAjhLt7ZE";
    const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}%2C${longitude}&pretty=1`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const location = data.results[0].formatted;
        console.log(location);
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

            const url3 = ` https://api.opentripmap.com/0.1/en/places/bbox?lon_min=${lonMin}&lon_max=${lonMax}&lat_min=${latMin}&lat_max=${latMax}&format=json&limit=10&apikey=5ae2e3f221c38a28845f05b6165ca5f078a6cd7e01751064ebf17758`;

            fetch(url3)
              .then((response3) => response3.json())
              .then((data3) => {
                console.log(data3);

                // for (let i = 0; i < data3.length; i++) {
                //   const place = data3[i];
                //   console.log(place);
                //   const placeName = place.name;
                //   console.log(placeName);
                //   const photoReference = place.xid;
                //   const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${photosApiKey}`;
                //   const img = document.createElement("img");
                //   img.src = photoUrl;
                //   console.log(img.src);
                //   img.alt = placeName;
                //   // append image element to the DOM
                //   document.body.appendChild(img);
              });
          });
      });
  });
}
window.initMap = initMap;

// below user input has to be lat and lon
// get them to pick a location on google maps from google api and get lat and lon values.
// open trip map api does not work with city names only as it is not specific enough

// write a function to group by kind and render

// subsections: give them all? or perhaps define on separate components of the react app

// when the user clicks on a button give them multiple buttons with 4 main kinds: big groups - accommodations, adult, amusements, interesting_places, sport, tourist_facilitites
// add event listener on the button
// get kids container from html

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
            // console.log(kinds);
          }
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
