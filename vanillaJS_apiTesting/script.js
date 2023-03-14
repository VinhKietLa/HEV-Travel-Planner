// below user input has to be lat and lon
// get them to pick a location on google maps from google api and get lat and lon values.
// open trip map api does not work with city names only as it is not specific enough
// Specify the single latitude and longitude value
const latitude = 35.7865;
const longitude = -9.4194;

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
        const latMin = Math.min(latitude, lat2);
        const latMax = Math.max(latitude, lat2);
        const lonMin = Math.min(longitude, lon2);
        const lonMax = Math.max(longitude, lon2);

        console.log(`Latitude Range: ${latMin} to ${latMax}`);
        console.log(`Longitude Range: ${lonMin} to ${lonMax}`);

        // open trip map return
        // have to continue playing with endpoints to decide whihc options to give to user
        // do we want to specify the sources or give all 4? this increases conditionals but again makes the app more cool
        // default response is 50 results, we can limit it this depending on our need

        const url3 = ` https://api.opentripmap.com/0.1/en/places/bbox?lon_min=${lonMin}&lon_max=${lonMax}&lat_min=${latMin}&lat_max=${latMax}&src_geom=wikidata&rate=1&format=json&limit=20&apikey=5ae2e3f221c38a28845f05b6165ca5f078a6cd7e01751064ebf17758`;

        fetch(url3)
          .then((response3) => response3.json())
          .then((data3) => {
            console.log("last", data3);
          });
      });
  });
