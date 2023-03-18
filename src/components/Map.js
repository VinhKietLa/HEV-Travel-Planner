import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import "../styles/map.css";
import {
  firstLoad,
  loadList,
  createListItem,
  apiGet,
  locationFormsubmit,
} from "./otmLocationGet/location";

const containerStyle = {
  width: "90%",
  height: "50vh",
  margin: "0 auto",
  marginTop: "50px",
  border: "5px solid rgb(245, 177, 114)",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [result, setResult] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCY88CmnQtk_uHolo6N3JIOWHMAjhLt7ZE",
  });

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/places-to-see");
  };

  const handleFormSumit = () => {
    navigate("/places-to-see");
    let lon;
    let lat;

    firstLoad();
    loadList();
    locationFormsubmit();
  };

  const onMapClick = async (e) => {
    const latitude = e.latLng.lat();
    const longitude = e.latLng.lng();

    setLatitude(latitude);
    setLongitude(longitude);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      function (results, status) {
        if (status === "OK" && results.length > 0) {
          const cityResult = results.find((result) =>
            result.types.includes("locality")
          );

          if (cityResult) {
            const cityLocation = cityResult.geometry.location;
            const cityAddress = cityResult.formatted_address;

            setResult(cityAddress);
            setMarkerPosition(cityLocation);
          } else {
            console.error("No city found");
            setResult("No city found, please try again!");
            setMarkerPosition({ lat: latitude, lng: longitude });
          }
        } else {
          console.error("Geocode failed", status);
          setMarkerPosition({ lat: latitude, lng: longitude });
        }
      }
    );
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onMapClick}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
      <div className="loc-info">
        <h2>Pick a location on the map or enter your desired destination</h2>
        <h3>Your Selected Destination:</h3>
        <h4
          style={{
            border: "1px solid gray",
            height: "30px",
            width: "30%",
            margin: "0 auto",
          }}
        >
          {result}
        </h4>
        <button onClick={handleButtonClick}>FIND PLACES TO SEE</button>
      </div>

      <div className="loc-search">
        <form id="search-form" class="input-group mb-4 border p-1">
          <input
            id="textbox"
            type="search"
            placeholder="Region, city (e.g. London)"
            aria-describedby="button-search"
            class="form-control bg-none border-0"
          />
          <div class="input-group-prepend border-0">
            <button
              onClick={handleFormSumit}
              id="button-search"
              type="submit"
              class="btn btn-link"
            >
              {" "}
              GO!
            </button>
          </div>
        </form>
      </div>
      {/* 
      <div>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
        <p>Nearest city: {result}</p>
      </div> */}
    </div>
  ) : (
    <></>
  );
}

export default Map;
