// DOM elements
let userLat = document.getElementById("lat");
let userLng = document.getElementById("lng");
let result = document.getElementById("result");
let optionsBtn = document.getElementById("checkMyOptions");
let chosenKindDiv = document.getElementById("chosen-kind");
let catBtns = document.getElementById("category-buttons");
const kindsDiv = document.getElementById("kinds-container");

// Use the OpenCage Geocoder API to get the location information for the latitude and longitude
const apiKey = "d4fa4867fc804ba4a8af0e7e9346c89c";
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
            // display the nearest city on the webpage
            result.textContent = "No city found, please try again!";

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

    // openmaptrip api fetch to hook into user input for lat and lon on map selection
    const url3 = `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${longitude}&lat=${latitude}&rate=2&format=json&limit=2&apikey=5ae2e3f221c38a28845f05b6165ca5f078a6cd7e01751064ebf17758`;

    fetch(url3)
      .then((response3) => response3.json())
      .then((data3) => {
        console.log("data3", data3);

        let list = document.getElementById("list");
        list.innerHTML = "";
        data3.forEach((item) => list.appendChild(createListItem(item)));
        let nextBtn = document.getElementById("next_button");
        if (count < offset + pageLength) {
          nextBtn.style.visibility = "hidden";
        } else {
          nextBtn.style.visibility = "visible";
          nextBtn.innerText = `Next (${offset + pageLength} of ${count})`;
        }
      });
  });
}
window.initMap = initMap;

// search box user input

function apiGet(method, query) {
  return new Promise(function (resolve, reject) {
    let otmAPI =
      "https://api.opentripmap.com/0.1/en/places/" +
      method +
      "?apikey=" +
      "5ae2e3f221c38a28845f05b6165ca5f078a6cd7e01751064ebf17758";
    if (query !== undefined) {
      otmAPI += "&" + query;
    }
    fetch(otmAPI)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  });
}

// paging
// results per page
const pageLength = 5;

let lon;
let lat;

let offset = 0;
// total objects count
let count;

// get placename from input text box and get a location from API
// if place found, loading function

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    let name = document.getElementById("textbox").value;
    apiGet("geoname", "name=" + name).then(function (data) {
      let message = "Name not found";
      if (data.status == "OK") {
        message = data.name + ", " + data.country;
        lon = data.lon;
        lat = data.lat;
        firstLoad();
      }
      document.getElementById("info").innerHTML = `${message}`;
    });
    event.preventDefault();
  });

// function to get total object count within 1km from specified location and then loads first objects page

function firstLoad() {
  apiGet(
    "radius",
    `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
  ).then(function (data) {
    count = data.count;
    offset = 0;
    document.getElementById(
      "info"
    ).innerHTML += `<p>${count} objects with description in a 1km radius</p>`;
    loadList();
  });
}

// load list
function loadList() {
  apiGet(
    "radius",
    `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
  ).then(function (data) {
    let list = document.getElementById("list");
    list.innerHTML = "";
    data.forEach((item) => list.appendChild(createListItem(item)));
    let nextBtn = document.getElementById("next_button");
    if (count < offset + pageLength) {
      nextBtn.style.visibility = "hidden";
    } else {
      nextBtn.style.visibility = "visible";
      nextBtn.innerText = `Next (${offset + pageLength} of ${count})`;
    }
  });
}

// create list item at the left pane
function createListItem(item) {
  let a = document.createElement("a");
  a.className = "list-group-item list-group-item-action";
  a.setAttribute("data-id", item.xid);
  a.innerHTML = `<h5 class="list-group-item-heading">${item.name}</h5>`;

  a.addEventListener("click", function () {
    document.querySelectorAll("#list a").forEach(function (item) {
      item.classList.remove("active");
    });
    this.classList.add("active");
    let xid = this.getAttribute("data-id");
    apiGet("xid/" + xid).then((data) => onShowPOI(data));
  });
  return a;
}

// show preview and description at the right pane

function onShowPOI(data) {
  let poi = document.getElementById("poi");
  poi.innerHTML = "";
  if (data.preview) {
    poi.innerHTML += `<img src="${data.preview.source}">`;
  }
  poi.innerHTML += data.wikipedia_extracts
    ? data.wikipedia_extracts.html
    : data.info
    ? data.info.descr
    : "No description";
}

// next button
document.getElementById("next_button").addEventListener("click", function () {
  offset += pageLength;
  loadList();
});
