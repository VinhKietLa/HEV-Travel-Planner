let userLat = document.getElementById('lat');
let userLng = document.getElementById('lng');


let map;

function initMap() {

//This targets the map div and sets the default location that is displayed on the map when it loads.
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35.67796492606207, lng: 139.77230167581152 },
    zoom: 8,
  });


  // Creates a new marker everytime the user clicks on the map.
  const marker = new google.maps.Marker({
    map: map,
    visible: false, // Set the marker to be initially hidden
  });

  // This event listener listens to the map and returns the lon and lat values on each click.
  
  google.maps.event.addListener(map, "click", function (event) {
    // Get the latitude and longitude of the clicked location
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Set the position of the marker to the clicked location
    marker.setPosition(event.latLng);

    // Show the marker
    marker.setVisible(true);

    // TODO: Add code to display the coordinates to the user or perform any other action

    // console.log(lat);
    // console.log(lng);
    userLat.textContent = `${lat}`;
    userLng.textContent = `${lng}`;

  });
}

window.initMap = initMap;
