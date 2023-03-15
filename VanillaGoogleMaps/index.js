let userLat = document.getElementById('lat');
let userLng = document.getElementById('lng');

let map;

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
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
    
      // Use the geocoding API to look up the nearest city
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, function (results, status) {
        if (status === "OK" && results.length > 0) {
          // Find the nearest city
          const cityResult = results.find(result => result.types.includes("locality"));
    
          if (cityResult) {
            // Get the city location and address
            const cityLocation = cityResult.geometry.location;
            const cityAddress = cityResult.formatted_address;
            console.log("Nearest city:", cityAddress);
    
            // Set the position of the marker to the nearest city location
            marker.setPosition(cityLocation);
            marker.setVisible(true);
    
            // Update the UI with the latitude, longitude, and nearest city
            userLat.textContent = `${cityLocation.lat()}`;
            userLng.textContent = `${cityLocation.lng()}`;
            // Add the nearest city to the UI
            userLat.insertAdjacentHTML("afterend", `, ${cityAddress}`);
          } else {
            console.error("No city found");
    
            // Set the marker to the center of the map if no city is found
            marker.setPosition(map.getCenter());
            marker.setVisible(true);
    
            // Update the UI with the latitude and longitude
            userLat.textContent = `${lat}`;
            userLng.textContent = `${lng}`;
            // Remove the nearest city from the UI
            userLat.nextSibling?.remove();
          }
        } else {
          console.error("Geocode failed:", status);
    
          // Set the marker to the center of the map if geocoding fails
          marker.setPosition(map.getCenter());
          marker.setVisible(true);
    
          // Update the UI with the latitude and longitude
          userLat.textContent = `${lat}`;
          userLng.textContent = `${lng}`;
          // Remove the nearest city from the UI
          userLat.nextSibling?.remove();
        }
      });
});
}
window.initMap = initMap;
