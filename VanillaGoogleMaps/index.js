let userLat = document.getElementById('lat');
let userLng = document.getElementById('lng');
let searchBox = document.getElementById('pac-input');

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

  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
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
