import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "../styles/map.css";
import {
  firstLoad,
  loadList,
  locationFormsubmit,
  mapFormSubmit,
} from "./otmLocationGet/location";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { FormControl } from "react-bootstrap";

const containerStyle = {
  width: "90%",
  height: "50vh",
  margin: "0 auto",
  marginTop: "50px",
  border: "3px solid #a4cce3",
  boxShadow: "0px 6px 6px 2px rgba(34, 27, 27, 0.549)",
};

const center = {
  lat: 51.5074,
  lng: -0.1278,
};

function Map() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [result, setResult] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDVKPP95DVeSebNWO0mWaEMhADQScLslbk",
  });

  const navigate = useNavigate();

  // map pin location search
  const handleButtonClick = () => {
    navigate("/places-to-see");

    firstLoad(latitude, longitude);
    loadList(latitude);
    console.log(
      "line 45 map form submit call",
      markerPosition.lat,
      markerPosition.lng
    );
    mapFormSubmit(markerPosition.lat, markerPosition.lng);
  };

  // search by location
  const handleFormSumit = () => {
    navigate("/places-to-see");

    loadList();
    locationFormsubmit();
  };

  const onMapClick = async (e) => {
    const latitude = e.latLng.lat();
    const longitude = e.latLng.lng();

    setLatitude(latitude);
    setLongitude(longitude);

    let geocoder = new window.google.maps.Geocoder();
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
        console.log("from mapjs line 86", latitude, longitude);
        mapFormSubmit(latitude.toFixed(5), longitude.toFixed(5));
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
        <h4>Your Selected Destination:</h4>
        <h4
          className="map-loc"
          style={{
            border: "1px solid rgb(215, 211, 211)",
            height: "45px",
            width: "30%",
            margin: "0 auto",
            marginBottom: "20px",
          }}
        >
          {result}
        </h4>

        {/* <button

        <button

          id="button-search"
          type="submit"
          className="btn btn-secondary"
          onClick={handleButtonClick}
        >
          Take me there!

        </button> */}
      </div>

      <div className="loc-search">
        <h4>Where would you like to go?</h4>

        <form id="search-form" className="input-group mb-4 border p-1">
          <input
            id="textbox"
            type="search"
            placeholder="City (e.g. London)"
            aria-describedby="button-search"
            className="form-control"
            style={{ backgroundColor: "transparent", border: "none" }}
          />
          <div className="input-group-prepend border-0"></div>
        </form>
        <button
          onClick={handleFormSumit}
          id="button-search"
          type="submit"
          className="btn btn-secondary"
        >
          <FontAwesomeIcon
            icon={faMapLocation}
            style={{
              height: "45px",
              width: "45px",
              color: "#a4cce3",
            }}
          />
        </button>
      </div>

      {/* <div>

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
