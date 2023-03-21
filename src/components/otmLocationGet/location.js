export function apiGet(method, query) {
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

export function mapFormSubmit(latitude, longitude) {
  apiGet(
    "radius",
    `radius=1000&limit=${pageLength}&offset=${offset}&lon=${longitude}&lat=${latitude}&rate=2&format=count`
  ).then(function (data) {
    console.log(data, "data");
    count = data.count;
    offset = 0;
    document.getElementById(
      "info"
    ).innerHTML += `<p>${count} objects with description in a 1km radius</p>`;
    loadList();
  });
}

export function locationFormsubmit() {
  let name = document.getElementById("textbox").value;
  apiGet("geoname", "name=" + name).then(function (data) {
    let message = "Name not found";
    if (data.status === "OK") {
      message = data.name + ", " + data.country;
      lon = data.lon;
      lat = data.lat;
      firstLoad();
    }
    document.getElementById("info").innerHTML = `${message}`;
  });
}

// document
//   .getElementById("search-form")
//   .addEventListener("submit", function (event) {
//     let name = document.getElementById("textbox").value;
//     apiGet("geoname", "name=" + name).then(function (data) {
//       let message = "Name not found";
//       if (data.status == "OK") {
//         message = data.name + ", " + data.country;
//         lon = data.lon;
//         lat = data.lat;
//         firstLoad();
//       }
//       document.getElementById("info").innerHTML = `${message}`;
//     });
//     event.preventDefault();
//   });

// function to get total object count within 1km from specified location and then loads first objects page

export function firstLoad() {
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
export function loadList() {
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
export function createListItem(item) {
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

export function onShowPOI(data) {
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

export function nextBtn() {
  offset += pageLength;
  loadList();
}
